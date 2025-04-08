"use client";

import { CardOverview } from "@/components/card/card-overview";
import { DataBarChart } from "@/components/charts/bar-chart";
import { DataPieChart } from "@/components/charts/pie-chart";
import { DailyDataTable } from "@/components/data-table/daily-data-table";
import { DateRangePicker } from "@/components/date-range-picker/date-range-picker";
import { startOfMonth } from "date-fns";
import { ChartBar } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";



export default function Dashboard() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: new Date() 
    });
    
    return (
        <section className="space-y-4 p-4">
            <section className="flex items-center justify-between">
                <div className="flex flex-col justify-start">
                <small className="text-[12px] font-light text-slate-500">
                    Olá, Victor Siqueira
                </small>
                <h1 className="text-slate-600 font-semibold tracking-tighter text-2xl">
                    Dashboard
                </h1>
                </div>
                <DateRangePicker date={date} setDate={setDate}/>
            </section>
            <section className="space-x-4 flex flex-row">
                <CardOverview
                    title="Faturamento"
                    icon={ChartBar}
                    trending={20}
                    type="currency"
                    value={4184.80}
                    help="Valor total do faturamento baseado na data selecionada"
                />
                <CardOverview
                    title="Vendas"
                    icon={ChartBar}
                    trending={-15}
                    type="number"
                    value={54}
                    help="Vendas concluídas baseadas na data selecionada"
                />
                <CardOverview
                    title="Instalação"
                    icon={ChartBar}
                    trending={48}
                    type="percent"
                    value={0.88}
                    help="Percentual de instalação baseado na data selecionada"
                />
            </section>
            <section className="space-x-4 flex flex-row">
                <DataBarChart dateRange={date}/>
                <DataPieChart dateRange={date}/>
            </section>
            <section>
                <DailyDataTable/>
            </section>
        </section>
    );
}