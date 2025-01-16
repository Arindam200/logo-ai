'use server';

import OpenAI from 'openai';
import { z } from 'zod';
import dedent from 'dedent';
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

const apiKey = process.env.NEBIUS_API_KEY;
if (!apiKey) {
  throw new Error('NEBIUS_API_KEY is not defined in environment variables');
}

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: apiKey,
});

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
  modern: 'modern style',
  classic: 'classic style',
  minimalist: 'minimalist style',
  // Add other styles as needed
};

export async function generateLogo(formData: z.infer<typeof FormSchema>) {
  'use server';
  
  try {
    const validatedData = FormSchema.parse(formData);
    
    const prompt = `Generate a single logo, high-quality, award-winning professional design, made for both digital and print media for ${validatedData.companyName}. The logo should be ${validatedData.style} and ${validatedData.symbolPreference}. The primary & main color should be ${validatedData.primaryColor} and the background color should be ${validatedData.secondaryColor}.The company name is ${validatedData.companyName}, make sure to include the company name in the logo.Don't make spelling mistakes. ${validatedData.additionalInfo ? `Additional info: ${validatedData.additionalInfo}` : ""}`;
    // const prompt = dedent`A single logo, high-quality, award-winning professional design, made for both digital and print media, only contains a few vector shapes, ${styleLookup[validatedData.style]}

//   Primary color is ${validatedData.primaryColor.toLowerCase()} and background color is ${validatedData.secondaryColor.toLowerCase()}. The company name is ${validatedData.companyName}, make sure to include the company name in the logo. ${validatedData ? `Additional info: ${validatedData.additionalInfo}` : ""}`;
    
    const response = await client.images.generate({
      model: validatedData.model,
      prompt: prompt,
      response_format: "url",
      size: validatedData.size,
      quality: validatedData.quality,
      n: 1,
    });

    const imageUrl = response.data[0].url;
    
    return { 
      success: true, 
      url: imageUrl,
    };
  } catch (error) {
    console.error('Error generating logo:', error);
    return { success: false, error: 'Failed to generate logo' };
  }
}

  