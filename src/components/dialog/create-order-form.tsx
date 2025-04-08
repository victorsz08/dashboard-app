"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogClose, DialogHeader } from "../ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CalendarIcon, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Combobox } from "../combobox/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue  } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

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

const createOrderScheme = z.object({
  number: z.coerce.number().min(1, { message: "campo número é obrigatório" }),
  local: z.string().min(1, { message: "campo local é obrigatório" }),
  schedulingDate: z.coerce
    .date()
    .min(new Date("2024-01-01"), { message: "campo data é obrigatório" }),
  schedulingTime: z.string().min(1, { message: "campo horário é obrigatório" }),
  price: z.string().min(1, { message: "campo preço é obrigatório" }),
  contact: z.string().min(1, { message: "campo contato é obrigatório" }),
  observation: z.string().optional(),
});

type CreateOrderFormData = z.infer<typeof createOrderScheme>;

export function CreateOrderForm() {
  const form = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderScheme),
    defaultValues: {
      number: 0,
      local: "",
      observation: "",
      price: "",
      schedulingDate: new Date(),
      schedulingTime: "",
      contact: "",
    },
  });

  function handleNumberFormat(value: string) {
    const valueFormatted = value.replace(/\D/g, "");
    if (!valueFormatted) {
      return "";
    }

    return valueFormatted;
  }

  function handlePriceFormat(value: string) {
    const valueFormatted = value.replace(/\D/g, "");
    if (!valueFormatted) {
      return "";
    }

    const priceFormatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(valueFormatted) / 100);

    return priceFormatted;
  }

  const price = form.watch("price")
    ? handlePriceFormat(form.watch("price"))
    : "";
  const contact = form.watch("contact")
    ? handleNumberFormat(form.watch("contact"))
    : "";

  function onSubmit(data: CreateOrderFormData) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="w-[180px] text-xs cursor-pointer">
          <Plus size={14} />
          <span>Novo Contrato</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-600">
            Criar Novo Contrato
          </DialogTitle>
          <DialogDescription className="text-xs font-light text-slate-400">
            Preencha todas as informações
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel className="text-xs font-light text-slate-400">
                      N° do Contrato
                    </FormLabel>
                    <Input
                      {...field}
                      className="text-xs text-slate-600 placeholder:text-slate-400"
                      placeholder="N° do Contrato"
                    />
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel className="text-xs font-light text-slate-400">
                      Local
                    </FormLabel>
                    <Combobox value={field.value} onChange={field.onChange} />
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schedulingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel className="text-xs font-light text-slate-400">
                      Data de Agendamento
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="outline"
                          type="button"
                          className="w-full flex flex-row items-center gap-1 justify-start text-xs text-slate-600"
                        >
                            <CalendarIcon size={14} />
                          {field.value ? (
                            format(field.value, "dd MMM yyyy", { locale: ptBR })
                          ) : (
                            <span className="text-slate-400">
                              Selecione uma data
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          initialFocus
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
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
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel className="text-xs font-light text-slate-400">
                      Horário de Agendamento
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full text-xs">
                        <FormControl>
                          <SelectValue
                            placeholder="Selecione um horário"
                            className="text-xs text-slate-600 placeholder:text-slate-400"
                          />
                        </FormControl>
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem
                            className="text-slate-600 text-xs"
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel className="text-xs font-light text-slate-400">
                      Serviço
                    </FormLabel>
                    <Input
                      onChange={field.onChange}
                      value={price}
                      placeholder="R$ 0,00"
                      className="text-xs text-slate-600 placeholder:text-slate-400"
                    />
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel className="text-xs font-light text-slate-400">
                      Contato
                    </FormLabel>
                    <Input
                        value={contact}
                        onChange={field.onChange}
                        placeholder="Ex: (11) 99999-9999"
                        className="text-xs text-slate-600 placeholder:text-slate-400"
                    />
                    <FormMessage className="text-[10px]" />
                </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full justify-start items-start">
                  <FormLabel className="text-xs font-normal text-slate-500">
                    Observações
                  </FormLabel>
                  <Textarea
                    {...field}
                    placeholder="Observações referentes ao contrato..."
                    className="text-xs text-slate-600 resize-none h-36 placeholder:text-slate-400 placeholder:text-xs"
                  />
                  <FormMessage className="text-[10px]" />
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
              <Button className="w-[160px] text-xs cursor-pointer">
                Criar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
