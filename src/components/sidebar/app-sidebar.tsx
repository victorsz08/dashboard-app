"use client";

import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton } from "../ui/sidebar";
import { NavItemProps, NavItems } from "./nav-main";
import { Clipboard, ExternalLink, FileSearch, House, LogOut, Notebook, UserRoundSearch, Wallet } from "lucide-react";
import { Separator } from "../ui/separator";

const navMainItems: NavItemProps[] = [
  {
      title: "Dashboard",
      href: "/dashboard",
      icon: House
  },
  {
      title: "Contratos",
      href: "/contratos",
      icon: Clipboard
  },
  {
      title: "Notas",
      href: "/notas",
      icon: Notebook
  },
];

const navLinkItems: NavItemProps[] = [
  {
      title: "Consultar CPF",
      href: "https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp",
      icon: UserRoundSearch,
      target: "_blank"
  },
  {
      title: "Consultar CNPJ",
      href: "https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_Solicitacao.asp",
      icon: FileSearch,
      target: "_blank"
  },
  {
      title: "Negocia Fácil Claro",
      href: "https://claro.negociafacil.com.br/",
      icon: Wallet,
      target: "_blank"
  },
  {
      title: "Site Oficial da Claro",
      href: "https://www.claro.com.br/",
      icon: ExternalLink,
      target: "_blank"
  },
]

export function AppSidebar({ ...props } : React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="flex flex-row items-center gap-1">
            <Image src="icon.svg" width={32} height={32} alt="Logo Notetools"/>
            <h1 className="text-xl tracking-tighter font-semibold text-slate-600 group-data-[collapsible=icon]:hidden">
              Notetools
            </h1>
        </SidebarHeader>
        <Separator/>
        <SidebarContent>
            <NavItems items={navMainItems} groupLabel="Navegação"/>
            <Separator/>
            <NavItems items={navLinkItems} groupLabel="Links"/>
        </SidebarContent>
        <Separator/>
        <SidebarFooter>
            <SidebarMenuButton className="text-red-600 bg-red-100 hover:bg-red-200 hover:text-red-700 cursor-pointer">
              <LogOut/>
              <span className="group-data-[collapsible=icon]:hidden">Sair</span>
            </SidebarMenuButton>
        </SidebarFooter>
    </Sidebar>
  );
}