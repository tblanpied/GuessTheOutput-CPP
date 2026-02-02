"use client";

import { useState } from "react";

import { X } from "lucide-react";
import { Check } from "lucide-react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/data_display/Badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/utils";

import { Button } from "./Button";

const MultiSelectCombobox = ({
  options,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No matches.",
  className,
}: {
  options: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (next: string[]) => {
    setSelected(next);
    onChange(next);
  };

  const toggle = (value: string) => {
    if (selected.includes(value)) handleChange(selected.filter((v) => v !== value));
    else handleChange([...selected, value]);
  };

  const clear = () => handleChange([]);
  return (
    <div className={cn("space-y-2", className)}>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {selected.length === 0 ? placeholder : `${selected.length} selected`}
            </span>
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const isSelected = selected.includes(opt);
                return (
                  <CommandItem
                    key={opt}
                    value={opt}
                    onSelect={() => toggle(opt)}
                    className="cursor-pointer"
                  >
                    <span className="truncate">{opt}</span>
                    <Check
                      className={cn("ml-auto h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {selected.slice(0, 10).map((v) => (
            <Badge
              key={v}
              variant="secondary"
              className="gap-1"
            >
              <span className="max-w-[14rem] truncate">{v}</span>
              <button
                type="button"
                className="focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2"
                onClick={() => toggle(v)}
                aria-label={`Remove ${v}`}
              >
                <X className="h-3.5 w-3.5 opacity-70" />
              </button>
            </Badge>
          ))}
          {selected.length > 10 && <Badge variant="outline">+{selected.length - 10} more</Badge>}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clear}
            className="h-7 px-2"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export { MultiSelectCombobox };
