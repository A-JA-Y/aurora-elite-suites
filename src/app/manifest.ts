import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aurora Elite Suites",
    short_name: "Aurora Suites",
    description: "Golf-view two-bedroom serviced suites at Godrej Golf Links, Greater Noida.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6eae1",
    theme_color: "#8c4318",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
