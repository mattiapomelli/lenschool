import { Meta, Story } from "@storybook/react";
import { useState } from "react";

import { RadioGroup, RadioGroupProps } from "./radio-group";

export default {
  title: "Basic/RadioGroup",
  component: RadioGroup,
} as Meta;

const Template: Story<RadioGroupProps> = (args) => {
  const [selected, setSelected] = useState<string | undefined>();

  return <RadioGroup {...args} value={selected} onValueChange={setSelected} />;
};

export const Default = Template.bind({});

Default.args = {
  items: ["Startup", "Business", "Enterprise"],
};
