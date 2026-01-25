import { Separator } from "@components/ui/separator";
import { SidebarTrigger } from "@components/ui/sidebar";
import { appName } from "@constants/app";
import ThemeSwitch from "../ui/ThemeSwitch";

const DashboardHeader = () => {
  return (
    <header className="flex h-(--header-height) px-4 lg:px-6 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="ml-2 mr-4 data-[orientation=vertical]:h-4"
      />
      <div className="flex w-full items-center justify-between">
        <h2 className="text-base font-medium">{appName}</h2>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default DashboardHeader;
