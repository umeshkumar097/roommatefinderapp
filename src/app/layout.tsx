import type { Metadata } from "next";
// import { Inter, Outfit } from "next/font/google"; // Import fonts
import "./globals.css";
import { Providers } from "@/components/providers";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "RoomieVibes - Find Your Perfect Roommate",
    template: "%s | RoomieVibes",
  },
  description: "RoomieVibes isn't just a roommate finder app—it's a lifestyle matchmaker designed for Gen Z. Swipe, match, and chat with verified roommates.",
  keywords: ["roommate finder", "roomshare", "flatmate", "rooms for rent", "roomievibes", "roommate app"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roomievibes.com",
    siteName: "RoomieVibes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RoomieVibes - Find Your Perfect Roommate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoomieVibes - Find Your Perfect Roommate",
    description: "Swipe, match, and chat with verified roommates.",
    images: ["/og-image.png"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3E7CVZ4Y50"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3E7CVZ4Y50');
            `,
          }}
        />
        <Providers>
          {/* <Navbar /> */}
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
