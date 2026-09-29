import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://indhira-ayu.vercel.app";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Indhira Ayu Puspita Ningrum | Informatics Engineering @ ITS",
    template: "%s | Indhira Ayu",
  },
  description:
    "Portfolio of Indhira Ayu Puspita Ningrum, Informatics Engineering student at ITS with experience in web development, machine learning, and system analysis.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Indhira Ayu Puspita Ningrum",
    title: "Indhira Ayu Puspita Ningrum | Portfolio",
    description: "Informatics Engineering student at ITS bridging business and technology.",
    images: [{ url: "/Image1.png", width: 307, height: 486, alt: "Indhira Ayu Puspita Ningrum" }],
  },
  twitter: {
    card: "summary",
    title: "Indhira Ayu Puspita Ningrum | Portfolio",
    description: "Informatics Engineering student at ITS bridging business and technology.",
    images: ["/Image1.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Indhira Ayu Puspita Ningrum",
  url: SITE_URL,
  jobTitle: "Informatics Engineering Student",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Institut Teknologi Sepuluh Nopember" },
  sameAs: [
    "https://github.com/indhiraya",
    "https://www.linkedin.com/in/indhiraya/",
    "https://www.instagram.com/indhira.ya/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
