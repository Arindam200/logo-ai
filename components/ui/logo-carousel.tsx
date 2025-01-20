"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LogoImage } from "./logo-image";
import { artworkData } from "@/constants/data";

export function LogoCarousel() {
  const plugin = React.useRef(
    Autoplay({
      delay: 0, // No delay for continuous movement
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

  const duplicatedArtworks = artworkData.map((item) => item.imageUrl);

  return (
    <section className="mt-20 md:mt-36 relative mb-10 max-w-7xl mx-auto h-fit w-full overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: true,
          dragFree: true,
          containScroll: "trimSnaps",
          duration: 10000,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className="animate-scroll">
          {duplicatedArtworks.map((artwork, index) => (
            <CarouselItem
              key={`${artwork}-${index}`}
              className="basis-[50%] sm:basis-1/2 md:basis-1/3 lg:basis-[30%]"
            >
              <LogoImage src={artwork} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
