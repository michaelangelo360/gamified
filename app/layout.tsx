import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider, SignUp } from "@clerk/nextjs";
 
import { Toaster } from "sonner";

import "./globals.css";
import { ExitModal } from "@/components/modal/exit-modal";
import { HeartsModal} from "@/components/modal/hearts-modal";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider> 
    <html lang="en">

      <body className={font.className}>
        <Toaster/>
        <ExitModal></ExitModal>
        <HeartsModal/>
        {children}
        </body>
    </html>
      </ClerkProvider>
  );
}
