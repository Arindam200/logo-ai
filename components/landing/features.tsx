import { IconCrown, IconSparkles } from "@tabler/icons-react";
import React from "react";
import { Badge } from "../ui/badge";
import { features } from "@/constants/data";
import { cn } from "@/lib/utils";

export default function Features() {
  return (
    <>
      <div id="features" className="bg-background py-10 mt-20">
        <div className="flex flex-col">
          <Badge className="w-fit px-4 py-2 flex items-center mb-4 gap-2">
            <IconCrown className="text-white size-4" />
            Features
          </Badge>
          <div className="text-4xl md:text-6xl font-medium">
            Key
            <span className="bg-gradient-to-tr mx-2 from-white via-primary to-white bg-clip-text text-transparent">
              Benifits
            </span>
            of using
            <br />{" "}
            <span className="text-muted-foreground/40 text-3xl md:text-5xl">
              Our Logo generator
            </span>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-10">
          {features.map((feature, index) => (
            <div
              className={cn(
                "border border-border/40 p-2 min-h-[20rem] hover:shadow-md rounded-3xl",
                index === 0 ? "md:col-span-1 md:row-span-4" : "",
                index === 3 ? "md:col-span-2 md:row-span-3 h-[20rem]" : ""
              )}
              key={index}
            >
              <div
                key={index}
                className={cn(
                  "p-4 rounded-2xl h-full relative group overflow-hidden flex flex-col bg-background border border-border/60  max-h-full hover:border-accent transition-all"
                )}
              >
                <div className="bottom-[-5rem] group-hover:opacity-30 dark:group-hover:opacity-80 opacity-0 right-[-20rem] z-[1] absolute bg-gradient-to-t  from-primary to-purple-800/20 blur-[5em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out size-[20rem] rotate-[40deg]"></div>
                <div
                  className={cn(
                    `absolute w-full h-full`,
                    index === 0 ? "md:-top-[10%]" : "",
                    index === 3
                      ? "-top-[20%] -left-[35%] md:-top-[20%]  md:-left-[43%]"
                      : "-top-[20%] -left-[35%] md:-left-[35%]"
                  )}
                >
                  <div className="flex z-[10] flex-col relative items-center justify-center">
                    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 w-36 h-36 absolute  border-primary/40 rounded-full"></div>
                    <div className="top-0 left-0 w-56 h-56  border-primary rounded-full bg-primary/5"></div>
                  </div>
                </div>
                <div className="text-4xl flex-1  z-20 mb-4">
                  <div className="flex items-center bg-primary p-4 rounded-full justify-center w-fit">
                    {<feature.icon className="size-10 text-white" />}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm font-semibold">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
