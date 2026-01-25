import AppSidebar from "@components/dashboard/AppSidebar";
import DashboardHeader from "@components/dashboard/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
