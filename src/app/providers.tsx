// src/app/providers.tsx
"use client";

import React from "react";
import { ReduxProvider } from "@/redux/provider";
import { CartModalProvider } from "@/app/context/CartSidebarModalContext";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import { PreviewSliderProvider } from "@/app/context/PreviewSliderContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <CartModalProvider>
        <ModalProvider>
          <PreviewSliderProvider>
            {children}
          </PreviewSliderProvider>
        </ModalProvider>
      </CartModalProvider>
    </ReduxProvider>
  );
}