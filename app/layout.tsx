import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibuchukwu Umeano",
  description: "Portfolio of Ibuchukwu Umeano",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      }
    ]
  },
  openGraph: {
    title: "Umeano Ibuchukwu — Full Stack Developer",
    description: "Creative full stack developer building sleek, scalable apps using MERN stack, Firebase, and cloud-native tools.",
    url: "https://ibuchukwu.vercel.app",
    type: "website",
    images: [
      {
        url: "https://ibuchukwu.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Umeano Ibuchukwu Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umeano Ibuchukwu — Full Stack Developer",
    description: "Crafting modern web solutions with a blend of frontend finesse and backend power.",
    images: ["https://ibuchukwu.vercel.app/og-image.png"],
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
