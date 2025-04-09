"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";


export type ValueCardProps = "currency" | "percent" | "number";

const ValueCardProps = {
    currency: "currency" as ValueCardProps,
    percent: "percent" as ValueCardProps,
    number: "number" as ValueCardProps,
} as const;

export type CardOverviewProps = {
    title: string;
    value: number;
    icon: LucideIcon;
    type: ValueCardProps;
    trending?: number;
    help?: string;
};

export function CardOverview(props: CardOverviewProps) {
    let valueFormatted;
    if(props.type === "currency") {
        valueFormatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        }).format(props.value);
    } else if(props.type === "percent") {
        valueFormatted = new Intl.NumberFormat("pt-BR", {
            style: "percent",            
            maximumFractionDigits: 2,
        }).format(props.value)
    } else  {
        valueFormatted = props.value
    };


    return (
        <Card className="w-full gap-2 shadow-none">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-[14px] font-light tracking-tighter text-slate-500">
                    {props.title}
                </CardTitle>
                <props.icon size={14}/>
            </CardHeader>
            <CardContent className="flex flex-row justify-between items-center">
                <span className="text-2xl font-bold tracking-tighter text-slate-700">
                    {valueFormatted}
                </span>
               {props.trending &&
                <span className={`${props.trending > 0 ? "text-green-700 bg-green-100"  : "text-red-700 bg-red-100"}
                    rounded-lg text-[10px] font-medium flex items-center gap-1 w-fit p-1`}>
                    {props.trending > 0 ? `+${props.trending}%` : `${props.trending}%`}
                    {props.trending > 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                </span>}
            </CardContent>
            <CardFooter>
                <span className="text-[12px] text-slate-400 font-light tracking-tighter">
                    {props.help}
                </span>
            </CardFooter>
        </Card>
    )
} 