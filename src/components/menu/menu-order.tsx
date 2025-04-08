"use client";

import { DataOrderType } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { ChevronDown } from "lucide-react";
import { UpdateSchedulingForm } from "../dialog/update-scheduling";
import { UpdateStatus } from "../dialog/update-status";
import { UpdateOrder } from "../dialog/update-order";
import { DeleteOrder } from "../dialog/delete-order";




export function MenuOrder({ data } : { data: DataOrderType }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
                className="flex items-center p-1 cursor-pointer justify-end gap-1 text-white w-fit rounded-md bg-slate-900">
                <span>Editar</span>
                <Separator orientation="vertical"/>
                <ChevronDown size={10} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col items-start text-start">
                <DropdownMenuItem asChild>
                    <UpdateSchedulingForm data={data}/>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateStatus data={data}/>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateOrder data={data}/>
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem asChild>
                    <DeleteOrder data={data}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}