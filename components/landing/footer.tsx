import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
  IconRocket,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconSparkles,
} from "@tabler/icons-react";
import GridLinesBg from "../grid-lines-bg";
import FooterGradient from "../ui/footer-gradient";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { domain } from "@/lib/domain";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="h-[30rem] border-t md:h-[40rem] relative py-10 mt-20">
        <div className="bg-background z-[-1] opacity-95 absolute inset-0 dark:bg-dot-white/[0.2] bg-dot-black/[0.2]"></div>
        <FooterGradient />
        <div className="flex z-[20] flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center justify-center">
            <Badge
              variant="outline"
              className="w-fit px-4 py-2 rounded-full flex items-center mb-4 gap-2"
            >
              Let&apos;s Start now <IconRocket className="size-4" />
            </Badge>
            <h1 className="text-4xl md:text-6xl text-center font-medium">
              Are you ready to explore your
              <span className="text-muted-foreground/40 text-3xl md:text-5xl">
                <br /> Creativity with{" "}
                <span className="bg-gradient-to-tr mx-2 from-white via-primary to-white bg-clip-text text-transparent">
                  LogoAI
                </span>
              </span>
              ?
            </h1>
            <div className="mt-8">
              <SignedOut>
                <SignInButton
                  signUpForceRedirectUrl={`${domain}/generate`}
                  forceRedirectUrl={`${domain}/generate`}
                >
                  <Button className="text-sm">
                    Start Generating <IconSparkles className="size-4" />
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/generate" className="w-full md:w-auto">
                  <Button className="text-sm">
                    Start Generating <IconSparkles className="size-4" />
                  </Button>
                </Link>
                {/* <Link href="/generate">
              <Button className="text-white">
                Get Started
              </Button> 
            </Link> */}
              </SignedIn>
            </div>
          </div>

          <div className="flex border-border/40 pt-8 w-full">
            <div className="max-w-6xl mx-auto px-4 w-full flex items-center justify-between">
              <div className="text-sm md:text-base">
                &copy; {new Date().getFullYear()} LogoAI
              </div>
              <div className="flex gap-4 items-center justify-center">
                <Link 
                  href="https://git.new/Arindam" 
                  target="_blank" 
                  className="hover:text-primary transition-colors"
                >
                  <IconBrandGithub className="size-5 md:size-8" />
                </Link>
                <Link 
                  href="https://dub.sh/arindam-linkedin" 
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  <IconBrandLinkedin className="size-5 md:size-8" />
                </Link>
                <Link 
                  href="https://dub.sh/arindam-x" 
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  <IconBrandX className="size-5 md:size-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
