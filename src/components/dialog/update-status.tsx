"use client";

import { DataOrderType, StatusType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { StatusBadge } from "../badge-status/status-badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const updateStatusScheme = z.object({
  status: z.string().min(1, { message: "Status é obrigatório" }),
});

const statusOptions = [
    {
        value: "pendente" as StatusType
    },
    {
        value: "conectado" as StatusType
    },
    {
        value: "cancelado" as StatusType
    },
    {
        value: "reagendar" as StatusType
    }
]

type UpdateStatusType = z.infer<typeof updateStatusScheme>;

export function UpdateStatus({ data }: { data: DataOrderType }) {
  const form = useForm<UpdateStatusType>({
    resolver: zodResolver(updateStatusScheme),
    defaultValues: {
      status: data.status.toLowerCase() as StatusType,
    },
  });

  function onSubmit(data: UpdateStatusType) {
    console.log(data);
  }

  return (
    <Dialog modal>
      <DialogTrigger className="text-xs w-full text-start text-slate-600 cursor-pointer p-2 hover:bg-slate-100">
        Editar Status
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-600">
            Editar Agendamento
          </DialogTitle>
          <DialogDescription className="text-xs font-light text-slate-500">
            Contrato: {data.number} - {data.local}
          </DialogDescription>
        </DialogHeader>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full justify-start items-start">
                        <FormLabel className="text-xs font-normal text-slate-500">
                          Status
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                                <FormControl>
                                    <SelectValue placeholder="Selecione o status" />
                                </FormControl>
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        <StatusBadge status={status.value}/>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        </FormItem>
                        
                    )}
                />
                <Separator/>
                <div className="flex flex-row justify-end gap-3 mt-2">
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="w-[160px] text-xs cursor-pointer"
                    >
                        Cancelar
                    </Button>
                </DialogClose>
                <Button
                    className="w-[160px] text-xs cursor-pointer"
                >
                    Atualizar
                </Button>
            </div>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
