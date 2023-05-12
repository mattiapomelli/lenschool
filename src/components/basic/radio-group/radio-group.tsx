import { RadioGroup as BaseRadioGroup } from "@headlessui/react";
import React from "react";

import { RadioItem } from "./radio-item";

export interface RadioGroupProps {
  items: string[];
  value: string | undefined;
  onValueChange: (value: string) => void;
}

export const RadioGroup = ({
  items,
  value,
  onValueChange,
}: RadioGroupProps) => {
  return (
    <BaseRadioGroup value={value} onChange={onValueChange}>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <BaseRadioGroup.Option key={item} value={item}>
            {({ checked }) => <RadioItem checked={checked} label={item} />}
          </BaseRadioGroup.Option>
        ))}
      </div>
    </BaseRadioGroup>
  );
};
