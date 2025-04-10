"use client";

import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useQuery } from "@tanstack/react-query";
import { DataOrderType } from "@/types";
import { Button } from "../ui/button";
import { MenuOrder } from "../menu/menu-order";
import { StatusBadge } from "../badge-status/status-badge";
import { CreateOrderForm } from "../dialog/create-order-form";
import { api } from "@/services/axios";
import { useSession } from "@/context/auth.context";
import { NotDataFound } from "./not-data-found";

async function getOrdersDaily(userId: string) {
  const currentDate = new Date();
  const response = await api.get(
    `contracts?userId=${userId}&schedulingDateIn=${currentDate}&schedulingDateOut=${currentDate}`
  );

  const dataList: DataOrderType[] = response.data;
  return dataList;
}

export function DailyDataTable() {
  const { user } = useSession();
  const { data: orders } = useQuery<DataOrderType[]>({
    queryKey: ["orders"],
    queryFn: () => getOrdersDaily(user!.id),
  });

  const currentDate = new Date();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-600">
          Pedidos Recentes
        </CardTitle>
        <CardDescription className="text-xs font-light tracking-tighter text-slate-500">
          Seus pedidos com instalações previstas para hoje{" "}
          {format(currentDate, "dd MMM", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders && orders?.length > 0 ? (
          <>
            <div className="flex justify-end mb-2">
              <CreateOrderForm />
            </div>
            <Table className="rounded-xl overflow-clip">
              <TableHeader>
                <TableRow className=" bg-slate-100 py-1 text-xs tracking-tighter">
                  <TableHead className="text-slate-500">
                    N° do Contrato
                  </TableHead>
                  <TableHead className="text-slate-500">Cidade</TableHead>
                  <TableHead className="text-slate-500">
                    Data de Agendamento
                  </TableHead>
                  <TableHead className="text-slate-500">Horário</TableHead>
                  <TableHead className="w-[150px] text-center text-slate-500">
                    Status
                  </TableHead>
                  <TableHead className="w-[150px] text-center text-slate-500">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-slate-600 text-xs">
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.number}</TableCell>
                    <TableCell>{order.local}</TableCell>
                    <TableCell>
                      {format(order.schedulingDate, "dd MMM yyyy", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>{order.schedulingTime}</TableCell>
                    <TableCell className="w-[150px] text-center">
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="w-[150px] text-center items-center justify-center flex">
                      <MenuOrder data={order} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <NotDataFound />
        )}
      </CardContent>
    </Card>
  );
}
