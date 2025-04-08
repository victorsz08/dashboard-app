"use client";

import { DataOrderType } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function DeleteOrder({ data }: { data: DataOrderType }) {
  return (
    <Dialog>
      <DialogTrigger className="text-xs text-red-500 cursor-pointer p-2 hover:bg-slate-100">
        Excluir
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-semibold text-slate-600">
            Tem certeza que deseja excluir o contrato?
          </DialogTitle>
          <DialogDescription className="text-xs text-center text-slate-500">
            Contrato: {data.number} - {data.local}
          </DialogDescription>
          <Separator/>
          <DialogFooter className="flex flex-row justify-center items-center mt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-[130px] text-xs cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button variant="destructive" className="w-[130px] text-xs cursor-pointer">
                Excluir
              </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
