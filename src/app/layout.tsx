import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    locale: SITE_CONFIG.locale,
    type: "website",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/images/logo.png", width: 512, height: 512, alt: SITE_CONFIG.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/images/logo.png" />
        {/* JSON-LD Restaurant Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Tia Penha Burger",
              description: SITE_CONFIG.description,
              image: "/images/logo.png",
              telephone: "(31) 3653-4809",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Contagem, 1743",
                addressLocality: "Belo Horizonte",
                addressRegion: "MG",
                postalCode: "31080-255",
                addressCountry: "BR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -19.9023,
                longitude: -43.9685,
              },
              url: SITE_CONFIG.url,
              servesCuisine: "Hambúrguer",
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "18:00",
                closes: "23:00",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
