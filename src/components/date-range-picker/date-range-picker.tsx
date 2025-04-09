"use client";

import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";

export type DateRangePickerProps = {
  date: DateRange | undefined;
  setDate: (newDate: DateRange | undefined) => void;
};

export function DateRangePicker({ date, setDate }: DateRangePickerProps) {

  return (
      <Popover modal>
        <PopoverTrigger 
            className="w-[200px] h-8 cursor-pointer justify-start text-left font-normal text-xs text-slate-600
            p-2 rounded-sm  border-1 border-slate-400 flex items-center gap-2 hover:bg-slate-50 duration-200">
            <CalendarIcon size={16}/>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd MMM", { locale: ptBR })} {" - "}
                  {format(date.to, "dd MMM, yy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd MMM, yy", { locale: ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit p-0">
          <Calendar
            initialFocus
            locale={ptBR}
            selected={date}
            onSelect={setDate}
            mode="range"
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
  );
}
