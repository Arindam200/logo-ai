import React from "react";
import { Button } from "./ui/button";
import { domain } from "@/lib/domain";
import { SignedOut } from "@clerk/nextjs";

export default function SignInButton() {
  return (
    <>
      <div>
        <SignedOut>
          <SignInButton
            signUpForceRedirectUrl={`${domain}/generate`}
            forceRedirectUrl={`${domain}/generate`}
          >
            <Button className="text-sm">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </>
  );
}
