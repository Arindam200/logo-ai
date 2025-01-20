"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { allLogos } from "../actions/actions";
import { SelectLogo } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/navbar";

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
    window.open(imageUrl, "_blank");
    toast({
      title: "Opening image",
      description: "The logo will open in a new tab",
    });
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold mb-8">
          Recent
          <span className="bg-gradient-to-tr mx-2 from-white via-primary to-white bg-clip-text text-transparent">
            Generations
          </span>{" "}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedLogos.map((logo) => (
            <Card className="group rounded-2xl" key={logo.id}>
              <CardContent className=" w-full rounded-2xl border-red-500">
                <div className="w-full rounded-t-2xl overflow-hidden aspect-square">
                  <img
                    src={logo.image_url}
                    alt={`${logo.username}'s logo`}
                    className="w-full  group-hover:scale-105 transition-all duration-700 ease-in-out h-full object-contain"
                  />
                </div>
                <div className="rounded-b-xl border-t p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{logo.username}</h3>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>
                        {new Date(logo.createdAt).toLocaleDateString()}
                      </span>
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
                    onClick={() => handleDownload(logo.image_url)}
                    className="w-full text-foreground group-hover:text-white bg-transparent border rounded-sm transition-all duration-500 ease-in-out group-hover:bg-primary mt-2"
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
              {showAll ? "Show Less" : "See More"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
