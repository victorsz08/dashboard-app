"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DateRange } from "react-day-picker"
import { api } from "@/services/axios"
import { DataOrderType } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "@/context/auth.context"

// Type for our chart data
interface StatusData {
  status: string
  quantidade: number
  fill: string
}

// Chart configuration
const chartConfig = {
  quantidade: {
    label: "Quantidade",
  },
  instaladas: {
    label: "Instaladas",
    color: "var(--color-purple-400)",
  },
  pendentes: {
    label: "Pendentes",
    color: "var(--color-purple-600)",
  },
  canceladas: {
    label: "Canceladas",
    color: "var(--color-purple-800)",
  },
} satisfies ChartConfig

async function generateStatusData(userId: string, dateRange?: DateRange): Promise<StatusData[]> {
  if (!dateRange?.from || !dateRange?.to) {
    return []
  }

  const response = await api.get(`contracts?createdDateIn=${dateRange.from.toISOString()}&createdDateOut=${dateRange.to.toISOString()}&userId=${userId}`);
  const contracts: DataOrderType[] = response.data;

  const conected = contracts.filter((contract) => contract.status === "conectado").length;
  const pending = contracts.filter((contract) => contract.status === "pendente").length;
  const canceled = contracts.filter((contract) => contract.status === "cancelado").length;


  return [
    {
      status: "instaladas",
      quantidade: conected,
      fill: "var(--color-instaladas)",
    },
    {
      status: "pendentes",
      quantidade: pending,
      fill: "var(--color-pendentes)",
    },
    {
      status: "canceladas",
      quantidade: canceled,
      fill: "var(--color-canceladas)",
    },
  ]
}

interface PieChartByDateProps {
  dateRange: DateRange | undefined;
}

export function DataPieChart({ dateRange }: PieChartByDateProps) {
  const { user } = useSession();

  const { data: chartData } = useQuery<StatusData[]>({
    queryKey: ["chartData"],
    queryFn: () => generateStatusData(user!.id, dateRange),
  })

  const total = React.useMemo(() => {
    return chartData?.reduce((acc, curr) => acc + curr.quantidade, 0)
  }, [chartData])

  const formatDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) return "Selecione um período"

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date)
    }

    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: StatusData = payload[0].payload;
      const percentage = total ? ((data.quantidade / total) * 100).toFixed(1) : "0.0";

      return (
        <div className="bg-white text-slate-500 p-2 border rounded shadow w-[180px]">
          <span className="flex items-center gap-1 mb-1">
            <span style={{ backgroundColor: data.fill}} className="w-3 h-3"></span>
            <p className="text-[12px] font-medium">{data.status}</p>
          </span>
          <p className="text-[10px]">Quantidade: {data.quantidade}</p>
          <p className="text-[10px]">Porcentagem: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-slate-600">Status de Instalações</CardTitle>
        <CardDescription className="text-xs">{formatDateRange()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip/>} />
            <Pie data={chartData} dataKey="quantidade" nameKey="status" innerRadius={50} strokeWidth={4}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-slate-600 text-2xl font-bold tracking-tighter">
                          {total!.toLocaleString("pt-BR")}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground tracking-tighter">
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex flex-row items-center justify-center flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <span style={{ backgroundColor: chartConfig.instaladas.color }} className="w-2 h-2"></span>
              <p className="text-[10px] text-slate-500">{chartConfig.instaladas.label}</p>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ backgroundColor: chartConfig.pendentes.color }} className="w-2 h-2"></span>
              <p className="text-[10px] text-slate-500">{chartConfig.pendentes.label}</p>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ backgroundColor: chartConfig.canceladas.color }} className="w-2 h-2"></span>
              <p className="text-[10px] text-slate-500">{chartConfig.canceladas.label}</p>
            </div>
        </div>
        <div className="leading-none text-xs text-center text-muted-foreground">
          Mostrando status de instalações para o período selecionado
        </div>
      </CardFooter>
    </Card>
  )
}