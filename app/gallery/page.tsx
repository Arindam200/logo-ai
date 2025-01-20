"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { allLogos } from "../actions/actions";
import { SelectLogo } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/navbar";

// Add a new interface for card props
interface LogoCardProps {
  logo: SelectLogo;
  onDownload: (imageUrl: string) => void;
}

// Separate the logo card into its own component for better animation control
const LogoCard = ({ logo, onDownload }: LogoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group rounded-2xl">
      <CardContent className="w-full rounded-2xl">
        <div className="w-full rounded-t-2xl overflow-hidden aspect-square relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}
          <img
            src={logo.image_url}
            alt={`${logo.username}'s logo`}
            className={`w-full h-full object-contain group-hover:scale-105 transition-all duration-700 ease-in-out
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className={`rounded-b-xl border-t p-4 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{logo.username}</h3>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>{new Date(logo.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2 my-2">
            <div
              className="w-6 h-6 border rounded-[8px]"
              style={{ backgroundColor: logo.primary_color }}
              title="Primary Color"
            />
            <div
              className="w-6 h-6 border rounded-[8px]"
              style={{ backgroundColor: logo.background_color }}
              title="Background Color"
            />
          </div>
          <Button
            onClick={() => onDownload(logo.image_url)}
            className="w-full text-foreground group-hover:text-white bg-transparent border rounded-sm transition-all duration-500 ease-in-out group-hover:bg-primary mt-2"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Gallery() {
  const { toast } = useToast();
  const [logos, setLogos] = useState<SelectLogo[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
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
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load logos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogos();
  }, []);

  const displayedLogos = showAll ? logos : logos.slice(0, 12);

  const handleDownload = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
    toast({
      title: "Opening image",
      description: "The logo will open in a new tab",
    });
  };

  // Add Skeleton loader component
  const SkeletonCard = () => (
    <Card className="group rounded-2xl">
      <CardContent className="w-full rounded-2xl">
        <div className="w-full rounded-t-2xl overflow-hidden aspect-square bg-slate-200 animate-pulse" />
        <div className="rounded-b-xl border-t p-4">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-slate-200 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4" />
          </div>
          <div className="flex gap-2 my-2">
            <div className="w-6 h-6 rounded-[8px] bg-slate-200 animate-pulse" />
            <div className="w-6 h-6 rounded-[8px] bg-slate-200 animate-pulse" />
          </div>
          <div className="h-9 bg-slate-200 rounded animate-pulse w-full mt-2" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold mb-8">
          Recent
          <span className="bg-gradient-to-tr mx-2 from-white via-primary to-white bg-clip-text text-transparent">
            Generations
          </span>{" "}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            // Show 12 skeleton cards while loading
            [...Array(12)].map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : logos.length > 0 ? (
            displayedLogos.map((logo) => (
              <LogoCard 
                key={logo.id} 
                logo={logo} 
                onDownload={handleDownload}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No logos generated yet
            </div>
          )}
        </div>

        {!isLoading && logos.length > 12 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="gap-2"
            >
              {showAll ? "Show Less" : "See More"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
