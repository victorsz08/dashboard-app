"use client";

import { DataOrderType } from "@/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Separator } from "../ui/separator";
import { 
    Select,
    SelectItem, 
    SelectTrigger,
    SelectContent, 
    SelectValue
 } from "../ui/select";

const timeOptions = [
  {
    value: "08h as 12h",
  },
  {
    value: "08h as 19h",
  },
  {
    value: "12h as 15h",
  },
  {
    value: "15h as 18h",
  },
];

const updateSchedulingScheme = z.object({
  schedulingDate: z.coerce
    .date()
    .min(new Date(), { message: "Data tem que ser maior que a data atual" }),
  schedulingTime: z.string().min(1, { message: "Horário é obrigatório" }),
});

type UpdateSchedulingType = z.infer<typeof updateSchedulingScheme>;

export function UpdateSchedulingForm({ data }: { data: DataOrderType }) {
  const form = useForm<UpdateSchedulingType>({
    resolver: zodResolver(updateSchedulingScheme),
    defaultValues: {
      schedulingDate: data.schedulingDate,
      schedulingTime: data.schedulingTime,
    },
  });

  function onSubmit(data: UpdateSchedulingType) {
    console.log(data);
  }

  return (
    <Dialog modal>
      <DialogTrigger className="text-xs text-slate-600 cursor-pointer p-2 hover:bg-slate-100">
        Editar Agendamento
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
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div
                className="grid grid-cols-2 gap-4 mb-4"
            >
              <FormField
                control={form.control}
                name="schedulingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <FormLabel className="text-xs font-normal text-slate-500">
                      Data de Agendamento
                    </FormLabel>
                    <Popover modal>
                      <PopoverTrigger className="w-full">
                        <Button
                          variant="outline"
                          className="w-full cursor-pointer text-slate-600 text-xs justify-start text-left font-normal"
                        >
                          <CalendarIcon size={16} />
                          {field.value ? (
                            format(field.value, "dd MMMM yyyy", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schedulingTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <FormLabel className="text-xs font-normal text-slate-500">
                      Horário
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full text-xs text-slate-600">
                        <FormControl>
                          <SelectValue
                            placeholder="Selecione um Horário"
                            className="text-xs text-slate-600"
                          />
                        </FormControl>
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem
                            className="text-xs text-slate-600"
                            key={time.value}
                            value={time.value}
                          >
                            {time.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>
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
