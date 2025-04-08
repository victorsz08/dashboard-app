"use client";

import { DataOrderType } from "@/types";
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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Combobox } from "../combobox/combobox";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const updateOrderScheme = z.object({
  number: z.coerce
    .number()
    .min(1, { message: "Número do contrato é obrigatório" }),
  observation: z.string().optional(),
  local: z.string().min(1, { message: "Cidade é obrigatório" }),
  price: z.string().min(1, { message: "Valor é obrigatório" }),
  contact: z.string().min(1, { message: "Contato é obrigatório" }),
});

type UpdateOrderType = z.infer<typeof updateOrderScheme>;

export function UpdateOrder({ data }: { data: DataOrderType }) {
  const form = useForm<UpdateOrderType>({
    defaultValues: {
      number: data.number,
      local: data.local,
      observation: data.observation,
      price: data.price.toString(),
      contact: data.contact,
    },
  });

  function onSubmit(data: UpdateOrderType) {
    console.log(data);
  }

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

  return (
    <Dialog modal>
      <DialogTrigger className="text-xs w-full text-start text-slate-600 cursor-pointer p-2 hover:bg-slate-100">
        Editar contrato
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-600">
            Editar Detalhes
          </DialogTitle>
          <DialogDescription className="text-xs font-light text-slate-500">
            Contrato: {data.number} - {data.local}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <FormLabel className="text-xs font-normal text-slate-500 ">
                      N° do Contrato
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Ex: 1234536786"
                      className="text-xs text-slate-600 placeholder:text-slate-400"
                    />
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <FormLabel className="text-xs font-normal text-slate-500">
                      Cidade
                    </FormLabel>
                    <Combobox value={field.value} onChange={field.onChange} />
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <FormLabel className="text-xs font-normal text-slate-500">
                      Valor
                    </FormLabel>
                    <Input
                      value={price}
                      onChange={field.onChange}
                      placeholder="R$ 99,99"
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
                  <FormItem className="flex flex-col w-full justify-start items-start">
                    <FormLabel className="text-xs font-normal text-slate-500">
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
                Atualizar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
