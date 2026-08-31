import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * FormField molecule — 04-component-library.md §3.2 / §5.
 *
 * Label + input slot + helper/error text, mutually exclusive
 * (02-design-system.md §8.3): error replaces help, never both. Required
 * fields carry no asterisk; the absence of "(optional)" is the required
 * marker, documented once in each form's top-level helper text
 * (02-design-system.md §8.3).
 *
 * `children` is a render-prop receiving the computed `id` and
 * `aria-describedby` — this is deliberately explicit rather than a
 * `cloneElement`-based injection, since several consuming fields render
 * more than one element inside a FormField (e.g. a password input plus
 * a strength meter), which `cloneElement` cannot target unambiguously.
 */
export interface FormFieldInputProps {
  id: string;
  "aria-describedby"?: string;
}

export interface FormFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  helperText?: string;
  errorText?: string;
  children: (inputProps: FormFieldInputProps) => React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  optional,
  helperText,
  errorText,
  children,
  className,
}: FormFieldProps) {
  const describedById = errorText
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {optional && (
          <span className="ml-1 text-muted-foreground font-normal">(optional)</span>
        )}
      </Label>
      {children({ id, "aria-describedby": describedById })}
      {errorText ? (
        <p id={`${id}-error`} role="alert" className="text-body-sm text-danger">
          {errorText}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-body-sm text-muted-foreground">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
