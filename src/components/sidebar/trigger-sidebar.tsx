"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";



export function TriggerSidebar() {
    const { toggleSidebar } = useSidebar();

    return (
        <SidebarMenuButton asChild>
            <Button 
                variant="secondary" 
                className="text-slate-600 w-fit cursor-pointer" 
                onClick={toggleSidebar}
            >
                <Menu size={16}/>
            </Button>
        </SidebarMenuButton>
    )
}