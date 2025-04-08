"use client";

import { AvatarMenu } from "@/components/avatar-menu/avatar-menu";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TriggerSidebar } from "@/components/sidebar/trigger-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar variant="sidebar" />
        <main className="w-full">
          <SidebarHeader className="w-full py-3 bg-white flex justify-between items-center flex-row">
            <TriggerSidebar />
            <AvatarMenu name="Victor Siqueira" username="victorsz08" image="" />
          </SidebarHeader>
          <Separator />
          {children}
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
