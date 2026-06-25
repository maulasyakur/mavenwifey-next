import PublicRootLayoutComponent from "@/components/public-root-layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <PublicRootLayoutComponent backgroundClassnameProps="bg-black/70 bg-blend-darken">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-pixelify mb-4">404</h1>
        <p className="mb-4">Page not found, bestie 💔</p>
        <Link href="/" className="underline">
          Go back home
        </Link>
      </div>
    </PublicRootLayoutComponent>
  );
}
