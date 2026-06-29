"use client";

import BlogBackgroundImage from "@/assets/blog-bg.webp";
import DefaultWallpaperImage from "@/assets/wallpaper.jpg";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const wallpapersDict: Record<string, { image?: string; className?: string }> = {
  "/blog": {
    image: BlogBackgroundImage.src,
    className: "bg-black/70 bg-blend-darken",
  },
};

export default function PublicRootLayoutComponent({
  children,
  backgroundClassnameProps,
}: {
  children: React.ReactNode;
  backgroundClassnameProps?: string;
}) {
  const location = usePathname();

  const matchingKey = Object.keys(wallpapersDict).find(
    (key) => location === key || location.startsWith(`${key}/`),
  );

  const backgroundImage = matchingKey
    ? wallpapersDict[matchingKey]?.image || DefaultWallpaperImage.src
    : DefaultWallpaperImage.src;

  const backgroundClassName = matchingKey
    ? wallpapersDict[matchingKey]?.className || ""
    : "";

  return (
    <div className="m-0 p-0 relative pixel-art text-white">
      {/* Background layer */}
      <div
        className="fixed inset-0 bg-cover blur-sm brightness-25 -z-30"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Content container + wallpaper background image */}
      <div
        className={cn(
          "relative max-w-md h-dvh mx-auto overflow-hidden bg-cover rounded-2xl",
          backgroundClassName,
          backgroundClassnameProps,
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Navbar />
        {children}
      </div>
    </div>
  );
}
