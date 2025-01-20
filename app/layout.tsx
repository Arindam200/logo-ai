import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Logo AI - Create Professional Logos in Minutes",
  description: "Generate unique, professional logos for your brand using AI. Choose from multiple styles, customize colors, and download high-quality logos instantly.",
  keywords: [
    "AI logo generator",
    "logo design",
    "artificial intelligence",
    "brand identity",
    "logo maker",
    "business logo",
    "professional logo",
    "custom logo",
    "logo creation",
    "Logo AI"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://logo-ai-nebius.vercel.app",
    title: "LogoAI - Create Professional Logos in Minutes",
    description: "Generate unique, professional logos for your brand using AI. Choose from multiple styles, customize colors, and download high-quality logos instantly.",
    siteName: "Logo AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logo AI - Create Professional Logos in Minutes",
    description: "Generate unique, professional logos for your brand using AI. Choose from multiple styles, customize colors, and download high-quality logos instantly.",
    creator: "@Arindam_1729",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${manrope.variable} font-primary antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
