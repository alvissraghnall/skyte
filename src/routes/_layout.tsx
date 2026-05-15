import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "#/components/Header";
import { Footer } from "#/components/Footer";

export const Route = createFileRoute("/_layout")({
  component: LayoutContent,
});

function LayoutContent() {
  return (
    <div className="h-screen flex flex-col bg-background text-on-surface">
      <Header />
      <main className="grow pt-16 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
