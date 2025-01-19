'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import {
  Wand2,
  Sparkles,
  Palette,
  Download,
  RefreshCw,
  History,
  Crown,
} from 'lucide-react';
import { generateLogo, downloadImage } from '../actions/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const STYLE_OPTIONS = [
  { id: 'minimal', name: 'Minimal', icon: '○', details: "Flashy, attention grabbing, bold, futuristic, and eye-catching. Use vibrant neon colors with metallic, shiny, and glossy accents."},
  { id: 'tech', name: 'Technology', icon: '⚡', details: "highly detailed, sharp focus, cinematic, photorealistic, Minimalist, clean, sleek, neutral color pallete with subtle accents, clean lines, shadows, and flat."},
  { id: 'corporate', name: 'Corporate', icon: '◆', details: "modern, forward-thinking, flat design, geometric shapes, clean lines, natural colors with subtle accents, use strategic negative space to create visual interest."},
  { id: 'creative', name: 'Creative', icon: '★', details: "playful, lighthearted, bright bold colors, rounded shapes, lively."},
  { id: 'abstract', name: 'Abstract', icon: '□', details: "abstract, artistic, creative, unique shapes, patterns, and textures to create a visually interesting and wild logo."},
  { id: 'flashy', name: 'Flashy', icon: '💡', details: "Flashy, attention grabbing, bold, futuristic, and eye-catching. Use vibrant neon colors with metallic, shiny, and glossy accents."},
];

const MODEL_OPTIONS = [
  { id: 'stability-ai/sdxl', name: 'Stability AI SDXL', description: 'Better for artistic and creative logos' },
  { id: 'dall-e-3', name: 'DALL-E 3', description: 'Better for realistic and detailed logos' },
  { id: 'black-forest-labs/flux-schnell', name: 'Flux Schnell', description: 'Better for realistic and detailed logos' },
  { id: 'black-forest-labs/flux-dev', name: 'Flux Dev', description: 'Better for realistic and detailed logos' },
];

const SIZE_OPTIONS = [
  { id: '256x256', name: 'Small (256x256)' },
  { id: '512x512', name: 'Medium (512x512)' },
  { id: '1024x1024', name: 'Large (1024x1024)' },
];

const COLOR_OPTIONS = [
  { id: '#2563EB', name: 'Blue' },
  { id: '#DC2626', name: 'Red' },
  { id: '#D97706', name: 'Orange' },
  { id: '#16A34A', name: 'Green' },
  { id: '#9333EA', name: 'Purple' },
  { id: '#000000', name: 'Black' },
];

const BACKGROUND_OPTIONS = [
  { id: '#FFFFFF', name: 'White' },
  { id: '#F8FAFC', name: 'Light Gray' },
  { id: '#FEE2E2', name: 'Light Red' },
  { id: '#000000', name: 'Black' },
  { id: '#FEF2F2', name: 'Light Red' },
  { id: '#EFF6FF', name: 'Light Blue' },
  { id: '#F0FFF4', name: 'Light Green' },
];

export default function Home() {
  const [companyName, setCompanyName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('minimal');
  const [primaryColor, setPrimaryColor] = useState('#2563EB');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState('');
  const [selectedModel, setSelectedModel] = useState<('stability-ai/sdxl' | 'dall-e-3'|'black-forest-labs/flux-schnell' | 'black-forest-labs/flux-dev')>('stability-ai/sdxl');
  const [selectedSize, setSelectedSize] = useState<('256x256'|'512x512'|'1024x1024')>('512x512');
  const [selectedQuality, setSelectedQuality] = useState<('standard' | 'hd')>('standard');

  const { isSignedIn, isLoaded, user } = useUser();
  const { toast } = useToast();
  
  if (!isLoaded) {
    return <div className="">
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    </div>;
  }

  if (!isSignedIn) {
    return redirect('/');
  }

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateLogo({
        companyName,
        style: selectedStyle,
        symbolPreference: 'modern and professional',
        primaryColor,
        secondaryColor: backgroundColor,
        model: selectedModel,
        size: selectedSize,
        quality: selectedQuality,
        additionalInfo
      });

      if (result.success && result.url) {
        setGeneratedLogo(result.url);
        toast({
          title: "Logo generated successfully",
          description: "Your new logo is ready to download",
        });
      } else {
        toast({
          title: "Generation failed",
          description: result.error || "Failed to generate logo",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const result = await downloadImage(generatedLogo);
      if (result.success && result.data) {
        const a = document.createElement('a');
        a.href = result.data;
        a.download = `${companyName}-logo.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: "Download started",
          description: "Your logo is being downloaded",
        });
      } else {
        toast({
          title: "Download failed",
          description: "Failed to download logo",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while downloading",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation Bar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold">
          LogoAI
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/generate" className="text-gray-500 hover:text-primary transition-colors">
            Generate
          </Link>
          <Link href="/gallery" className="text-gray-500 hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link href="/pricing" className="text-gray-500 hover:text-primary transition-colors">
            Pricing
          </Link>
        </div>
            <div className="flex items-center gap-4">
              <Link href="/history">
                <Button size="sm" className="gap-2">
                  <History className="h-4 w-4" />
                  History
                </Button>
              </Link>
              {/* <Button variant="outline" size="sm">
                <Crown className="h-4 w-4 mr-2 text-amber-500" />
                Upgrade to Pro
              </Button> */}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[screen-height] overflow-y-hidden rounded-lg">
      <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Create Your Perfect Logo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl">Create unique, professional logos in minutes.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                {/* Brand Name */}
                <div>
                  <label className="text-sm font-medium text-slate-700">Brand Name</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your brand name"
                    className="mt-1"
                  />
                </div>

                {/* Style Selection */}
                <div>
                  <label className="text-sm font-medium text-slate-700">Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                    {STYLE_OPTIONS.map((style) => (
                      <motion.button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          selectedStyle === style.id
                            ? 'border-blue-500 bg-blue-50/50 text-blue-700 ring-1 ring-blue-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <motion.div 
                          className="text-xl mb-1"
                          animate={{ rotate: selectedStyle === style.id ? 360 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {style.icon}
                        </motion.div>
                        <div className="text-xs font-medium">{style.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Colors and Model Selection Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Primary Color</label>
                    <Select 
                      value={primaryColor} 
                      onValueChange={setPrimaryColor}>
                      <SelectTrigger className="mt-1">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }} />
                            {COLOR_OPTIONS.find(c => c.id === primaryColor)?.name || 'Select Color'}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {COLOR_OPTIONS.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.id }} />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Background</label>
                    <Select 
                      value={backgroundColor} 
                      onValueChange={setBackgroundColor}>
                      <SelectTrigger className="mt-1">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: backgroundColor }} />
                            {BACKGROUND_OPTIONS.find(c => c.id === backgroundColor)?.name || 'Select Background'}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {BACKGROUND_OPTIONS.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.id }} />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">AI Model</label>
                    <Select 
                      value={selectedModel} 
                      onValueChange={(value: 'stability-ai/sdxl' | 'dall-e-3'|'black-forest-labs/flux-schnell' | 'black-forest-labs/flux-dev') => setSelectedModel(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Model" />
                      </SelectTrigger>
                      <SelectContent>
                        {MODEL_OPTIONS.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-xs text-slate-500">{model.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Size and Quality Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Image Size</label>
                    <Select 
                      value={selectedSize} 
                      onValueChange={(value: '256x256' | '512x512' | '1024x1024') => setSelectedSize(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {SIZE_OPTIONS.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Quality</label>
                    <Select 
                      value={selectedQuality} 
                      onValueChange={(value: 'standard' | 'hd') => setSelectedQuality(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hd">HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <label className="text-sm font-medium text-slate-700">Additional Details</label>
                  <Textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Describe your brand personality, target audience, or any specific preferences..."
                    className="mt-1 h-20"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!companyName || loading}
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Generate Logo
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            <Card className="h-full">
              <CardContent className="p-6">
                {generatedLogo ? (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div 
                      className="aspect-square rounded-lg border-2 border-dashed border-slate-200 p-4"
                      style={{ backgroundColor }}
                    >
                      <img
                        src={generatedLogo}
                        alt="Generated logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleGenerate}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generate New
                      </Button>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="h-full flex items-center text-center p-8 pt-44"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="max-w-md space-y-4">
                      <Palette className="h-12 w-12 mx-auto text-blue-600 opacity-50" />
                      <h3 className="text-xl font-semibold text-slate-800">
                        Your Logo will appear here
                      </h3>
                      <p className="text-slate-500">
                        For best results, add additional details and let our AI generate a unique, professional logo
                        tailored to your business.
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10 gap-x-4">
          <div>
            Built with love by <Link href="https://dub.sh/arindam" className="text-blue-600 hover:text-blue-700">Arindam</Link> 
          </div>
          <div>
            Powered by <Link href="https://dub.sh/nebius" className="text-blue-600 hover:text-blue-700">Nebius AI</Link>
          </div>
        </div>
      </main>
    </div>
      
  );
}