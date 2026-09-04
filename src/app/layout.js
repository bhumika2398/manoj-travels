import { Inter } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site.config";

// Clean, modern sans-serif used for everything — headings, body copy,
// navigation, forms and buttons. Weights 400–800 cover the full scale from
// body text up through the bold hero/section headings.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  ...buildMetadata(),
  metadataBase: new URL(siteConfig.url),
};

// Intentionally minimal — the marketing chrome (navbar, footer, floating
// WhatsApp/call actions, brand schemas) lives in src/app/(site)/layout.js
// so it never leaks into /admin, which has its own separate shell.
export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
