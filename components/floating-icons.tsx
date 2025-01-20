import { IconClick } from "@tabler/icons-react";
import { IconNorthStar } from "@tabler/icons-react";
import React from "react";

export default function FloatingIcons() {
  return (
    <>
      <div className="flex bg-primary/10 dark:bg-accent/10 p-3 px-4 rounded-2xl backdrop-blur-sm shadow-xl shadow-primary/30 absolute top-[5%] left-[-2rem] md:top-[15rem] md:left-[17%] lg:left-[20%] lg:top-[19rem] -rotate-12 items-center gap-2">
        <IconNorthStar className="size-8 text-primary dark:text-foreground" />
      </div>
      <div className="flex bg-primary/10 dark:bg-accent/10 p-3 px-4 rounded-2xl backdrop-blur-sm shadow-xl shadow-primary/30 absolute top-[48%] right-[-2rem] md:top-[15rem] md:right-[17%] lg:right-[20%] lg:top-[19rem] rotate-12 items-center gap-2">
        <IconClick className="size-8 fill-[hsl(var(--primary))] text-primary dark:text-foreground dark:fill-[hsl(var(--foreground))]" />
      </div>
    </>
  );
}
