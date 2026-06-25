import PublicRootLayoutComponent from "@/components/public-root-layout";

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicRootLayoutComponent>{children}</PublicRootLayoutComponent>;
}
