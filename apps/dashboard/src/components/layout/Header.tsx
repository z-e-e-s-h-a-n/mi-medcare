import { Bell } from "lucide-react";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import ThemeSwitch from "@workspace/ui/components/theme-toggle";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { appName } from "@workspace/shared/constants";
import {
  getUnreadNotificationsCount,
  useNotifications,
} from "@/hooks/notification";

const Header = () => {
  const { data: notifications } = useNotifications();
  const unreadCount = getUnreadNotificationsCount(notifications);

  return (
    <header className="flex h-(--header-height) px-4 lg:px-6 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="ml-2 mr-4 data-[orientation=vertical]:h-4"
      />
      <div className="flex w-full items-center justify-between">
        <h2 className="text-base font-medium">{appName.default}</h2>
        <div className="flex items-center gap-2">
          <Button
            href="/notifications"
            aria-label="Open notifications"
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="size-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -right-1 -top-1 min-w-5 px-1.5 text-[10px]">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
