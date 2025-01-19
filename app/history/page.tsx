'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import { checkHistory } from '../actions/actions';
import { useEffect, useState } from 'react';
import { SelectLogo } from '@/db/schema';
import { useToast } from "@/hooks/use-toast";

export default function History() {
  const { toast } = useToast();
  const [logos, setLogos] = useState<SelectLogo[]>([]);

  useEffect(() => {
    const checkUserHistory = async () => {
      const history = await checkHistory();
      if (history) {
        setLogos(history);
      } else {
        toast({
          title: "Error",
          description: "Failed to load history",
          variant: "destructive",
        });
      }
    }; 
    checkUserHistory();
  }, []);
  
  const handleDownload = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
    toast({
      title: "Opening image",
      description: "The logo will open in a new tab",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logos.map((logo) => (
            <Card key={logo.id}>
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg border-2 border-dashed border-slate-200 p-4 mb-4">
                  <img
                    src={logo.image_url}
                    alt={`Logo ${logo.id}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-slate-800">Created by {logo.username}</h3>
                  <div className="flex gap-2 text-sm text-slate-500">
                    <span>{new Date(logo.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: logo.primary_color }}
                      title="Primary Color"
                    />
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: logo.background_color }}
                      title="Background Color"
                    />
                  </div>
                  <Button
                    onClick={() => handleDownload(logo.image_url)}
                    variant="outline"
                    className="w-full mt-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}