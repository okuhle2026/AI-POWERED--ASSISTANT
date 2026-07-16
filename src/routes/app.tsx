import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/vault/AppSidebar";
import { TopBar } from "@/components/vault/TopBar";
import { VaultFooter } from "@/components/vault/Footer";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="relative flex min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]" />
      <AppSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
        <VaultFooter />
      </div>
    </div>
  );
}
