import { NavBar } from "@/components/layout/navBar";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background-normal">
      <div className="p-6 h-dvh flex gap-6">
        <Sidebar />

        {/* Main */}
        <div className="flex flex-col gap-6 w-full">
          <NavBar />

          {children}
        </div>
      </div>
    </div>
  );
}
