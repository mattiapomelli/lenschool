import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Input } from "@components/basic/input";

export default {
  title: "Basic/Input",
  component: Input,
  args: {
    placeholder: "Type something...",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

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

export const Tiny = Template.bind({});

Tiny.args = {
  size: "xs",
};

export const Small = Template.bind({});

Small.args = {
  size: "sm",
};

export const Normal = Template.bind({});

Normal.args = {
  size: "md",
};

export const Large = Template.bind({});

Large.args = {
  size: "lg",
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const FullWidth = Template.bind({});

FullWidth.args = {
  block: true,
};

export const WithLabels = Template.bind({});

WithLabels.args = {
  label: "Main Label",
  topRightLabel: "Alt Label",
  bottomLeftLabel: "Alt Label",
  bottomRightLabel: "Alt Label",
};

export const WithError = Template.bind({});

WithError.args = {
  error: "This field is required",
};

const SearchIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m19.02 18.063 4.782 4.782a.676.676 0 0 1-.957.957l-4.782-4.783a.676.676 0 0 1 .956-.956zM10.144 0C15.748 0 20.29 4.542 20.29 10.145S15.748 20.29 10.145 20.29 0 15.748 0 10.145 4.542 0 10.145 0zm0 1.353a8.792 8.792 0 1 0 0 17.584 8.792 8.792 0 0 0 0-17.584z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const LeftIcon = Template.bind({});

LeftIcon.args = {
  leftIcon: <SearchIcon />,
};

export const RightIcon = Template.bind({});

RightIcon.args = {
  rightIcon: <SearchIcon />,
};
