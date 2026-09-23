import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aurora Elite Suites",
    short_name: "Aurora Suites",
    description: "Golf-view two-bedroom serviced suites at Godrej Golf Links, Greater Noida.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#2f5b40",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
