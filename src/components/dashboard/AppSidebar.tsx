"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

import NavMain from "@components/dashboard/NavMain";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@components/ui/sidebar";
import {
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import Link from "next/link";
import { appName } from "@constants/app";
import useUser from "@hooks/user";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import UserCard from "./UserCard";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { isMobile } = useSidebar();
  const { currentUser, isFetching, logoutUser, isLogoutPending, logoutError } =
    useUser();

  const logout = async () => {
    await logoutUser();
    if (logoutError) {
      toast.error("Error: in Logout User");
    }
    toast.success("Logout Successfully.");
    redirect("/auth/sign-in");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="size-5!" />
                {appName}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hidden">
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UserCard currentUser={currentUser} isFetching={isFetching} />
                  <IconDotsVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <UserCard currentUser={currentUser} isFetching={isFetching} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/dashboard/users/account">
                      <IconUserCircle />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <IconNotification />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={isLogoutPending}
                  onClick={logout}
                  className="cursor-pointer"
                >
                  <IconLogout />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
