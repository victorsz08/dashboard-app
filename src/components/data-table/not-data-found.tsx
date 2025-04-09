"use client";

import { ShoppingBag } from "lucide-react";
import { CreateOrderForm } from "../dialog/create-order-form";




export function NotDataFound() {

    return (
        <section className="flex flex-col justify-center mb-4 items-center gap-4 w-full">
            <span className="p-8 w-fit bg-slate-200 text-slate-400 rounded-full">
                <ShoppingBag size={64}/>
            </span>
            <span className="flex flex-col justify-center items-center gap-4">
                <p className="text-lg font-semibold text-slate-600">
                    Nenhum pedido encontrado
                </p>
                <CreateOrderForm/>
            </span>
        </section>
    )
}