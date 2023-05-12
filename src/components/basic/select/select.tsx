import { Listbox, Transition } from "@headlessui/react";
import cx from "classnames";
import React, { Fragment, ReactNode } from "react";

import { Label } from "@components/basic/label";
import CheckIcon from "@icons/check.svg";
import ChevronDownIcon from "@icons/chevron-down.svg";

const variantClassname = {
  solid: "bg-base-300 border-base-300",
  bordered: "bg-transparent border-base-300",
  ghost: "border-transparent disabled:bg-transparent",
};

const sizeClassname = {
  xs: "input-xs h-8 px-2.5 min-w-[11rem]",
  sm: "input-sm h-9 px-3 min-w-[12rem]",
  md: "h-10 px-4 min-w-[13rem]",
  lg: "input-lg h-11 px-5 min-w-[14rem]",
};

const iconClass =
  "absolute top-1/2 transform -translate-y-1/2 [&>svg]:max-w-min";

const iconSizeClassname = {
  xs: "[&>svg]:max-h-3.5",
  sm: "[&>svg]:max-h-4",
  md: "[&>svg]:max-h-5",
  lg: "[&>svg]:max-h-6",
};

const iconPaddingClassname = {
  xs: "pl-7",
  sm: "pl-8",
  md: "pl-10",
  lg: "pl-12",
};

const iconPositionClassname = {
  xs: "left-2.5",
  sm: "left-3",
  md: "left-3.5",
  lg: "left-4",
};

export interface SelectProps {
  variant?: keyof typeof variantClassname;
  size?: keyof typeof sizeClassname;
  items: string[];
  value: string | undefined; // TODO: make this optional
  onValueChange: (value: string) => void;
  label?: string;
  block?: boolean;
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
}

export const Select = ({
  variant = "solid",
  size = "md",
  items,
  value,
  onValueChange,
  placeholder,
  label,
  block,
  icon,
  className,
}: SelectProps) => {
  return (
    <div
      className={cx(
        "flex-col relative",
        block ? "flex" : "inline-flex",
        className,
      )}
    >
      <Listbox value={value} onChange={onValueChange}>
        {/* Label */}
        {label && (
          <Listbox.Label className="cursor-pointer">
            <Label as="span">{label}</Label>
          </Listbox.Label>
        )}
        <div className="relative">
          {/* Trigger */}
          <Listbox.Button
            className={cx(
              "relative w-full flex items-center",
              "rounded-btn",
              "border-2",
              "text-left",
              "focus:outline-none focus-visible:ring-4 focus:ring-primary/30",
              variantClassname[variant],
              sizeClassname[size],
              icon && iconPaddingClassname[size],
            )}
          >
            {/* Icon */}
            {icon && (
              <span
                className={cx(
                  iconClass,
                  iconSizeClassname[size],
                  iconPositionClassname[size],
                  "text-base-content-neutral",
                )}
              >
                {icon}
              </span>
            )}
            <span className="block truncate">{value || placeholder}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Menu */}
            <Listbox.Options
              className={cx(
                "rounded-btn",
                "border-2",
                "absolute z-10",
                "mt-1 w-full overflow-auto",
                "py-1",
                "text-base",
                "shadow-lg",
                "ring-1 ring-base-content/5",
                "focus:outline-none",
                variantClassname[variant],
              )}
            >
              {items.map((item) => (
                <Listbox.Option
                  key={item}
                  className={({ active }) =>
                    cx(
                      `cursor-pointer select-none relative pr-4 flex items-center`,
                      {
                        "text-primary bg-primary/10": active,
                      },
                      sizeClassname[size],
                      iconPaddingClassname[size],
                    )
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cx(
                          "block truncate",
                          selected ? "font-medium" : "font-normal",
                        )}
                      >
                        {item}
                      </span>
                      {/* Check Icon */}
                      {selected && (
                        <span
                          className={cx(
                            "absolute inset-y-0 flex items-center text-primary",
                            iconSizeClassname[size],
                            iconPositionClassname[size],
                          )}
                        >
                          <CheckIcon aria-hidden="true" className="h-full" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
