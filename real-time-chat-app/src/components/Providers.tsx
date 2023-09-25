"use client";

import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* A toaster is a user interface component that is typically used to display non-intrusive notifications or messages to the user*/}
      {/* When reverseOrder is set to false, newer notifications are displayed on top of older ones. */}
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </>
  );
}

export default Providers;
