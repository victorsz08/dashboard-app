"use client";

import { CardOverview } from "@/components/card/card-overview";
import { DataTableOrders } from "@/components/data-table/data-orders";
import { DateRangePicker } from "@/components/date-range-picker/date-range-picker";
import { startOfMonth } from "date-fns";
import { ChartBarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function ContratosPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: new Date() 
    });

  
    return (
    <section className="p-4 space-y-4 flex flex-col">
      <section className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start">
            <small className="text-[12px] font-light text-slate-500">
              Olá, Victor Siqueira
            </small>
            <h1 className="text-slate-600 font-semibold tracking-tighter text-2xl">
              Contratos
            </h1>
          </div>
          <DateRangePicker date={date} setDate={setDate} />
            </section>
        <section className="flex flex-row space-x-4">
            <CardOverview
                title="Faturamento"
                icon={ChartBarIcon}
                trending={24}
                type="currency"
                value={4184.90}
                help="Faturamento de vendas instaladas"
            />
            <CardOverview
                title="Conectados"
                icon={ChartBarIcon}
                trending={24}
                type="number"
                value={12}
                help="Pedidos conectados"
            />
            <CardOverview
                title="Faturamento"
                icon={ChartBarIcon}
                type="number"
                value={8}
                help="vendas pendentes"
            />
            <CardOverview
                title="Canceladas"
                icon={ChartBarIcon}
                trending={-10}
                type="number"
                value={5}
                help="Vendas canceladas"
            />
        </section>
        <section>
            <DataTableOrders/>
        </section>
    </section>
  );
}
