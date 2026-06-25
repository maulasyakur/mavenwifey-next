import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="border-b-2 p-2 flex items-center justify-between">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
