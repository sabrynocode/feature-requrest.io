"use client";

import { Toaster as HotToaster } from "react-hot-toast";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: theme === 'dark' ? '#111827' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
        },
      }}
    />
  );
}
