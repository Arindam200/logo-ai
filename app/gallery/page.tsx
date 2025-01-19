'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import Navigation from '@/components/ui/Navigation';
import { useState, useEffect } from 'react';
import { allLogos } from '../actions/actions';
import { SelectLogo } from '@/db/schema';
import { useToast } from "@/hooks/use-toast";

export default function Gallery() {
  const { toast } = useToast();
  const [logos, setLogos] = useState<SelectLogo[]>([]);
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    const fetchLogos = async () => {
      const fetchedLogos = await allLogos();
      if (fetchedLogos) {
        setLogos(fetchedLogos);
      } else {
        toast({
          title: "Error",
          description: "Failed to load logos",
          variant: "destructive",
        });
      }
    };
    fetchLogos();
  }, []);

  const displayedLogos = showAll ? logos : logos.slice(0, 12);

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
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Recent Generations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedLogos.map((logo) => (
            <Card key={logo.id}>
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg border-2 border-dashed border-slate-200 p-4 mb-4">
                  <img
                    src={logo.image_url}
                    alt={`${logo.username}'s logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-slate-800">{logo.username}</h3>
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
        
        {logos.length > 12 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="gap-2"
            >
              {showAll ? 'Show Less' : 'See More'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
