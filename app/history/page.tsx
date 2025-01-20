"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import { checkHistory } from "../actions/actions";
import { useEffect, useState } from "react";
import { SelectLogo } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/navbar";
import LogoCard from "@/components/logo-card";

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
    window.open(imageUrl, "_blank");
    toast({
      title: "Opening image",
      description: "The logo will open in a new tab",
    });
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="max-w-6xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LogoCard logos={logos} handleDownload={handleDownload} />
        </div>
      </div>
    </div>
  );
}
