import React from "react";

export default function Gradient() {
  return (
    <>
      <div className="top-[15rem] md:top-[5rem] left-[0%] z-[-1] absolute bg-gradient-to-t opacity-50 dark:opacity-100 from-primary to-purple-800/20 blur-[5em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out w-[10rem] md:w-[10rem] h-[20rem] md:h-[60rem] rotate-[40deg]"></div>
      <div className="top-[15rem] md:top-[5rem] right-[0%] z-[-1] absolute bg-gradient-to-t opacity-50 dark:opacity-100 from-primary to-purple-800/20 blur-[5em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out w-[10rem] md:w-[10rem] h-[20rem] md:h-[60rem] -rotate-[40deg]"></div>
    </>
  );
}
