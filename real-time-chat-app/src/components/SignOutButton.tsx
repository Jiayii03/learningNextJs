"use client";

import React, { ButtonHTMLAttributes, useState } from "react";
import Button from "./ui/Button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2, LogOutIcon } from "lucide-react";

// extends ButtonHTMLAttributes so that the attributes of the button element can be passed in
interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

// ...props is the rest of the props that are passed in
function SignOutButton({ ...props }) {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  return (
    <Button
      {...props}
      variant="ghost"
      onClick={async () => {
        setIsSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error("There was an error signing out");
        } finally {
          setIsSigningOut(false);
        }
      }}
    >
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOutIcon className="w-4 h-4" />
      )}
    </Button>
  );
}

export default SignOutButton;
