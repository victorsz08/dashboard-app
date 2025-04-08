"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";


export type AvatarMenuProps = {
    name: string;
    username: string;
    image?: string;
};

const avatarMenuItems = [
    {
        name: "Configurações",
        href: "/configuracoes" 
    },
    {
        name: "Perfil",
        href: "/perfil"
    }
]

export function AvatarMenu({ image, name, username } : AvatarMenuProps)  {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={image}/>
                    <AvatarFallback>
                        {name.split(" ").map((item) => item.charAt(0).toUpperCase())}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                    <span className="flex flex-col text-start gap-0 text-xs">
                        <span className="text-slate-700 font-semibold">{name}</span>
                        <span className="text-slate-500 font-light">@{username}</span>
                    </span>
                </DropdownMenuItem>
                <Separator/>
                {avatarMenuItems.map((item, index) => (
                    <DropdownMenuItem key={index} asChild className="text-[10px] text-slate-500 cursor-pointer">
                        <Link href={item.href}>
                            {item.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
                <Separator/>
                <DropdownMenuItem className="text-[10px] text-red-500 cursor-pointer">
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}