import cx from "classnames";
import { forwardRef, InputHTMLAttributes, Ref, useId } from "react";

const variantClassName = {
  solid: "border-base-300 bg-base-300",
  bordered:
    "border-base-300 bg-transparent hover:bg-base-300/40 disabled:bg-transparent",
};

const colorClassName = {
  primary: "text-primary focus:ring-primary",
  secondary: "text-secondary focus:ring-secondary",
  accent: "text-accent focus:ring-accent",
};

const sizeClassName = {
  xs: "w-3.5 h-3.5 rounded-sm focus:ring-2",
  sm: "w-4 h-4 rounded-sm focus:ring-2",
  md: "w-5 h-5 rounded focus:ring",
  lg: "w-6 h-6 rounded focus:ring",
};

const labelSizeClassName = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  variant?: keyof typeof variantClassName;
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
  color?: keyof typeof colorClassName;
  size?: keyof typeof sizeClassName;
  label?: string;
  labelSize?: keyof typeof labelSizeClassName;
  disabled?: boolean;
}

export const Checkbox = forwardRef(
  (
    {
      checked,
      onValueChange,
      onChange: baseOnChange,
      color = "primary",
      variant = "solid",
      size = "md",
      label,
      labelSize = "md",
      disabled,
      className,
      ...props
    }: CheckboxProps,
    ref?: Ref<HTMLInputElement>
  ) => {
    const id = useId();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      onValueChange?.(checked);
      baseOnChange?.(event);
    };

    return (
      <label
        htmlFor={id}
        className={cx(
          "inline-flex items-center select-none",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className
        )}
      >
        <input
          {...props}
          id={id}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          className={cx(
            colorClassName[color],
            variantClassName[variant],
            sizeClassName[size],
            "border-2",
            "disabled:opacity-50",
            "disabled:cursor-not-allowed",
            { "cursor-pointer": !disabled },
            "focus:outline-none focus:ring-offset-0 focus:ring-primary focus:ring-4 focus:ring-opacity-50"
          )}
        />
        {label && (
          <span
            className={cx(
              "ml-2 select-none",
              labelSizeClassName[labelSize],
              !disabled &&
                (checked ? "opacity-100" : "opacity-50 hover:opacity-100"),
              { "opacity-50": disabled }
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
