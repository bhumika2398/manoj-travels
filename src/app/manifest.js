import { siteConfig } from "@/config/site.config";

export default function manifest() {
  return {
    name: "Manoj Tours and Travels — Manoj Taxi Service",
    short_name: "Manoj Taxi",
    description:
      "24x7 taxi and cab service in Bangalore: one way, round trip, local and airport cabs.",
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
    ],
  };
}
