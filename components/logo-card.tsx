import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export interface LogoCardProps {
  id: number;
  image_url: string;
  username: string;
  createdAt: Date;
  primary_color: string;
  background_color: string;
  userId: string;
}

const LogoCard = ({
  logos,
  handleDownload,
}: {
  logos: LogoCardProps[];
  handleDownload: (imageUrl: string) => void;
}) => {
  return (
    <>
      {logos.map((logo) => (
        <Card className="group rounded-2xl" key={logo.id}>
          <CardContent className="w-full rounded-2xl border-red-500">
            <div className="w-full rounded-t-2xl overflow-hidden aspect-square">
              <img
                src={logo.image_url}
                alt={`${logo.username}'s logo`}
                className="w-full group-hover:scale-105 transition-all duration-700 ease-in-out h-full object-contain"
              />
            </div>
            <div className="rounded-b-xl border-t p-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-0">
                  <span className="text-xs text-muted-foreground">
                    Created by
                  </span>
                  <h3 className="text-lg font-semibold">{logo.username}</h3>
                </div>
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
    </>
  );
};

export default LogoCard;
