import cx from "classnames";
import { InputHTMLAttributes } from "react";

interface RadioItemProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const RadioItem = ({
  label,
  checked,
  className,
  ...props
}: RadioItemProps) => {
  return (
    <label className="flex cursor-pointer items-center">
      <input
        type="radio"
        className={cx(
          "cursor-pointer text-primary",
          "focus:outline-none focus:ring-offset-0 focus:ring-primary focus:ring-4 focus:ring-opacity-50",
          { "mr-2": label },
          className,
        )}
        checked={checked}
        {...props}
      />
      {label && (
        <span
          className={cx(
            "text-sm",
            checked ? "font-bold" : "font-normal text-base-content-neutral",
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};
