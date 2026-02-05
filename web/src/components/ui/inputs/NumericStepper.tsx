"use client";

import { Input } from "./Input";
import { Button } from "./Button";

const NumericStepper = ({
  value,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  disabled,
  ariaLabel,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  ariaLabel?: string;
}) => {
  const handleChange = (next: number) => {
    onChange(next);
  };

  const dec = () => handleChange(Math.max(min, value - step));
  const inc = () => handleChange(Math.min(max, value + step));

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={dec}
        disabled={disabled || value <= min}
        aria-label={ariaLabel ? `${ariaLabel}: decrease` : "Decrease"}
      >
        -
      </Button>

      <Input
        type="number"
        inputMode="numeric"
        className="w-24"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isNaN(next)) return;
          handleChange(Math.min(max, Math.max(min, next)));
        }}
        aria-label={ariaLabel ?? "Value"}
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={inc}
        disabled={disabled || value >= max}
        aria-label={ariaLabel ? `${ariaLabel}: increase` : "Increase"}
      >
        +
      </Button>
    </div>
  );
};

export { NumericStepper };
