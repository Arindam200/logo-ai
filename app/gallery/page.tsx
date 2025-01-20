"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { allLogos } from "../actions/actions";
import { SelectLogo } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/navbar";
import LogoCard from "@/components/logo-card";
import SkeletonCard from "@/components/skeleton-card";

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
            [...Array(12)].map((_, index) => <SkeletonCard key={index} />)
          ) : logos.length > 0 ? (
            displayedLogos.map((logo) => (
              <LogoCard key={logo.id} logo={logo} onDownload={handleDownload} />
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
