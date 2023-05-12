import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Checkbox } from "@components/basic/checkbox";

export default {
  title: "Basic/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});

Default.args = {};

export const Primary = Template.bind({});

Primary.args = {
  color: "primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
  color: "secondary",
};

export const Accent = Template.bind({});

Accent.args = {
  color: "accent",
};

export const Tiny = Template.bind({});

Tiny.args = {
  size: "xs",
};

export const Small = Template.bind({});

Small.args = {
  size: "sm",
};

export const Medium = Template.bind({});

Medium.args = {
  size: "md",
};

export const Large = Template.bind({});

Large.args = {
  size: "lg",
};

export const WithLabelTiny = Template.bind({});

WithLabelTiny.args = {
  label: "Show all assets",
  labelSize: "xs",
};

export const WithLabelSmall = Template.bind({});

WithLabelSmall.args = {
  label: "Show all assets",
  labelSize: "sm",
};

export const WithLabelMedium = Template.bind({});

WithLabelMedium.args = {
  label: "Show all assets",
  labelSize: "md",
};

export const WithLabelLarge = Template.bind({});

WithLabelLarge.args = {
  label: "Show all assets",
  labelSize: "lg",
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const DisabledWithLabel = Template.bind({});

DisabledWithLabel.args = {
  disabled: true,
  label: "Show all assets",
};
