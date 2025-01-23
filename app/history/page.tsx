"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import { checkHistory, downloadImage } from "../actions/actions";
import { useEffect, useState } from "react";
import { SelectLogo } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/navbar";
import LogoCard from "@/components/logo-card";
import SkeletonCard from "@/components/skeleton-card";

export default function History() {
  const { toast } = useToast();
  const [logos, setLogos] = useState<SelectLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const checkUserHistory = async () => {
      const history = await checkHistory();
      if (history) {
        setLogos(history);
        setIsLoading(false);
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

  const handleDownload = async (imageUrl: string) => {
    setIsDownloading(true);
    try {
      const result = await downloadImage(imageUrl);
      if (result.success && result.data) {
        const a = document.createElement("a");
        a.href = result.data;
        a.download = `logo.webp`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: "Download started",
          description: "Your logo is being downloaded",
        });
      } else {
        throw new Error("Failed to download logo");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred while downloading",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="max-w-6xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-3xl md:text-3xl mb-4 font-medium">
          Your
          <span className="bg-gradient-to-tr mx-2 from-white via-primary to-white bg-clip-text text-transparent">
            Logo History
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Show 12 skeleton cards while loading
            [...Array(12)].map((_, index) => <SkeletonCard key={index} />)
          ) : logos.length > 0 ? (
            logos.map((logo) => (
              <LogoCard key={logo.id} logo={logo} onDownload={handleDownload} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No logos generated yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
