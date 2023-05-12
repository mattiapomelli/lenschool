import { Meta, Story } from "@storybook/react";

import { TextArea, TextAreaProps } from "./textarea";

export default {
  title: "Basic/TextArea",
  component: TextArea,
  args: {
    placeholder: "Type something...",
  },
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Solid = Template.bind({});

Solid.args = {
  variant: "solid",
};

export const Bordered = Template.bind({});

Bordered.args = {
  variant: "bordered",
};

export const Ghost = Template.bind({});

Ghost.args = {
  variant: "ghost",
};

export const WithLabel = Template.bind({});

WithLabel.args = {
  label: "Description",
};

export const FullWidth = Template.bind({});

FullWidth.args = {
  block: true,
};

export const WithValidation = Template.bind({});

WithValidation.args = {
  required: true,
  error: "This field is required",
};

export const WithMaxLength = Template.bind({});

WithMaxLength.args = {
  maxLength: 10,
};

export const CustomSize = Template.bind({});

CustomSize.args = {
  rows: 10,
  cols: 50,
};
