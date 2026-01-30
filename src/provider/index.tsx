"use client";

import React from "react";
import ThemeProvider from "./theme";
import ReactQueryProvider from "./react-query";
import ConfirmDialogProvider from "./confirm-dialog";
import { Toaster } from "@components/ui/sonner";
import { MediaLibraryProvider } from "./media-library";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <ConfirmDialogProvider>
          <MediaLibraryProvider>
            <Toaster />
            {children}
          </MediaLibraryProvider>
        </ConfirmDialogProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
};

export default ProviderWrapper;
