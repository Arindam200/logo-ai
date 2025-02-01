'use server';

import OpenAI from 'openai';
import { z } from 'zod';
import dedent from 'dedent';
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { InsertLogo,logosTable,SelectLogo } from '@/db/schema';
import { db } from '@/db';
import { eq, desc } from 'drizzle-orm';
import { rateLimit } from '@/lib/upstash';

const apiKey = process.env.NEBIUS_API_KEY;
if (!apiKey) {
  throw new Error('NEBIUS_API_KEY is not defined in environment variables');
}


const { HELICONE_API_KEY } = process.env;

const clientOptions: ConstructorParameters<typeof OpenAI>[0] = {
  apiKey,
  baseURL: HELICONE_API_KEY
    ? "https://nebius.helicone.ai/v1/"
    : "https://api.studio.nebius.ai/v1/",
  ...(HELICONE_API_KEY && {
    defaultHeaders: { "Helicone-Auth": `Bearer ${HELICONE_API_KEY}` },
  }),
};

const client = new OpenAI(clientOptions);

const FormSchema = z.object({
  companyName: z.string(),
  style: z.string(),
  symbolPreference: z.string(),
  additionalInfo: z.string().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  model: z.enum(['stability-ai/sdxl', 'dall-e-3','black-forest-labs/flux-schnell', 'black-forest-labs/flux-dev','stability-ai/sdxl']),
  size: z.enum(['256x256','512x512','1024x1024']).default('512x512'),
  quality: z.enum(['standard', 'hd']).default('standard'),
});

const styleLookup: { [key: string]: string } = {
  flashy: "Flashy, attention grabbing, bold, futuristic, and eye-catching. Use vibrant neon colors with metallic, shiny, and glossy accents.",
  tech: "highly detailed, sharp focus, cinematic, photorealistic, Minimalist, clean, sleek, neutral color pallete with subtle accents, clean lines, shadows, and flat.",
  corporate: "modern, forward-thinking, flat design, geometric shapes, clean lines, natural colors with subtle accents, use strategic negative space to create visual interest.",
  creative: "playful, lighthearted, bright bold colors, rounded shapes, lively.",
  abstract: "abstract, artistic, creative, unique shapes, patterns, and textures to create a visually interesting and wild logo.",
  minimal: "minimal, simple, timeless, versatile, single color logo, use negative space, flat design with minimal details, Light, soft, and subtle.",
};

export async function generateLogo(formData: z.infer<typeof FormSchema>) {
  'use server';
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { success: rateLimitSuccess, remaining } = await rateLimit.limit(user.id);
    
    await (await clerkClient()).users.updateUserMetadata(user.id, {
      unsafeMetadata: {
        remaining,
      },
    });

    console.log("your remaining logo generation limit is", remaining)
    // if (remaining === 1) {
    //   await toast({
    //     title: "Warning",
    //     description: "You only have 1 logo generation remaining",
    //     variant: "destructive",
    //   });
    // }

    if (!rateLimitSuccess) {
      return { 
        success: false, 
        error: "You've reached your logo generation limit. Please try again later." 
      };
    }

    const validatedData = FormSchema.parse(formData);
    
    const prompt = dedent`A single logo, high-quality, award-winning professional design, made for both digital and print media, only contains a few vector shapes, ${styleLookup[validatedData.style]}.Primary color is ${validatedData.primaryColor.toLowerCase()} and background color is ${validatedData.secondaryColor.toLowerCase()}. The company name is ${validatedData.companyName}, make sure to include the company name in the logo. ${validatedData ? `Additional info: ${validatedData.additionalInfo}` : ""}`;
    
    const response = await client.images.generate({
      model: validatedData.model,
      prompt: prompt,
      response_format: "url",
      size: validatedData.size,
      quality: validatedData.quality,
      n: 1,
    });

    const imageUrl = response.data[0].url || "";

    const DatabaseData: InsertLogo = {
      image_url: imageUrl,
      primary_color: validatedData.primaryColor,
      background_color: validatedData.secondaryColor,
      username: user.username ?? user.firstName ?? 'Anonymous',
      userId: user.id,
    };

    try {
      await db.insert(logosTable).values(DatabaseData);
    } catch (error) {
      console.error('Error inserting logo into database:', error);
      throw error;
    }
    
    return { 
      success: true, 
      url: imageUrl,
    };
  } catch (error) {
    console.error('Error generating logo:', error);
    return { success: false, error: 'Failed to generate logo' };
  }
}

export async function checkHistory() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const userLogos = await db
      .select()
      .from(logosTable)
      .where(
        user.externalId 
          ? eq(logosTable.userId, user.externalId)
          : eq(logosTable.userId, user.id)
      )
      .orderBy(desc(logosTable.createdAt));

    return userLogos;
  } catch (error) {
    console.error('Error fetching user logos:', error);
    return null;
  }
}

export async function allLogos(){
  try{
    const allLogos = await db
      .select()
      .from(logosTable)
      .orderBy(desc(logosTable.createdAt));
    return allLogos
  }catch(error){
    console.error('Error fetchiing logos'+error)
    return null;
  }
}

export async function downloadImage(url: string) {
  'use server';

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    return {
      success: true,
      data: `data:${contentType};base64,${base64Image}`
    };

  } catch (error) {
    console.error('Error downloading image:', error);
    return {
      success: false,
      error: 'Failed to download image'
    };
  }
}

  