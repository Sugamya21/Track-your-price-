import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toast } from "radix-ui";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "DealDrop",
  description: "Have full control over your deals!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
          <Toaster richColors/>
      </body>
    </html>
  );
}
