"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"

type ComboboxProps = {
    value: string;
    onChange: (value: string) => void;
};

type CityOption = {
    label: string;
    value: string;
};



export function Combobox({ value, onChange } : ComboboxProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const { data: cities } = useQuery<CityOption[]>({
        queryKey: ["cities"],
        queryFn: fecthCities,
    });

    async function fecthCities(): Promise<CityOption[]> {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome");
        const cities: any[] = await response.json();
    
        const citiesList: CityOption[] = cities.map((city: any) => ({
            label: city.nome + " / " + city.microrregiao.mesorregiao.UF.sigla,
            value: city.nome + " / " + city.microrregiao.mesorregiao.UF.sigla,
        }));
    
        return citiesList;
    };

  return (
    <Popover modal>
      <PopoverTrigger className="w-full">
        <Button
          variant="outline"
          type="button"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-slate-600"
        >
          {value
            ? cities?.find((option) => option.value === value)?.label
            : "Selecione uma cidade."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 text-slate-600">
        <Command>
          <CommandInput placeholder="Buscar cidade..." className="h-9 text-slate-600" />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada</CommandEmpty>
            <CommandGroup>
              {cities && cities.map((option) => (
                <CommandItem
                    className="text-slate-600"
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
