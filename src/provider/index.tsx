"use client";

import React from "react";
import ThemeProvider from "./theme";
import ReactQueryProvider from "./react-query";
import { AlertDialogProvider } from "./alert-dialog";
import { Toaster } from "@components/ui/sonner";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <AlertDialogProvider>
          {children}
          <Toaster />
        </AlertDialogProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export default ProviderWrapper;
