import React from "react";

export default function FooterGradient() {
  return (
    <>
      {/* top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b h-[16rem] from-background via-background to-background/40 z-[-1]"></div>
      {/* left gradient */}
      <div className="absolute inset-x-0 w-[30%] bg-gradient-to-r h-full from-background via-background/20 to-background/40 z-[-1]"></div>
      {/* right gradient */}
      <div className="absolute top-0 right-0 w-[30%] bg-gradient-to-l h-full from-background via-background/20 to-background/40 z-[-1]"></div>
      {/* bottom gradient */}
      <div className="absolute bottom-0 w-full left-0 bg-gradient-to-t blur-[2em] h-[12rem] from-background via-background to-background/40 z-[-1]"></div>
    </>
  );
}
