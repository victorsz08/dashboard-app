"use client";

import { DataOrderType } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CreateOrderForm } from "../dialog/create-order-form";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";


async function getContracts() {

}


export function DataTableOrders({ }) {
    const [page, setPage] = useState<number>(1);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-600">Todos os Contratos</CardTitle>
                <CardDescription className="text-xs font-light text-slate-500">
                    Todos os contratos concluídos
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-end">
                    <CreateOrderForm/>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" type="button" className="text-xs">
                                Filtrar
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end">

                        </PopoverContent>
                    </Popover>
                </div>
                <Table className="rounded-lg overflow-clip">
                    <TableHeader>
                        <TableRow>
                            <TableHead>N° do Contrato</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Horário</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead className="text-center w-[180px]">
                                Status
                            </TableHead>
                            <TableHead className="flex items-center justify-center w-[130px]">
                                Ações
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}