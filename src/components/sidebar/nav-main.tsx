"use client";


import { LucideIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { Collapsible } from "../ui/collapsible";
import Link from "next/link";




export type NavItemProps = {
    title: string;
    href: string;
    icon: LucideIcon;
    target?: React.HTMLAttributeAnchorTarget;
};

export function NavItems({ items, groupLabel } : { items: NavItemProps[], groupLabel: string }) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-400">
                {groupLabel}
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        asChild
                        key={item.title}    
                        className="group/collapsible"
                    >
                        <Link href={item.href} target={item.target}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === item.href}
                                    tooltip={item.title}
                                    className="text-slate-500 data-[active=true]:text-white 
                                    data-[active=true]:bg-purple-800 cursor-pointer tracking-tight"
                                >
                                    <item.icon />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}