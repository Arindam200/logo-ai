import { Button } from "./button";
import Link from "next/link";
import { domain } from "@/lib/domain";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          LogoAI
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/generate"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Generate
          </Link>
          <Link
            href="/gallery"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/pricing"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton
              signUpForceRedirectUrl={`${domain}/generate`}
              forceRedirectUrl={`${domain}/generate`}
            >
              <Button className="inline-flex text-white">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
            {/* <Link href="/generate">
              <Button className="text-white">
                Get Started
              </Button> 
            </Link> */}
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
