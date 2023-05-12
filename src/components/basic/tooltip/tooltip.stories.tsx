import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Tooltip } from "@components/basic/tooltip";

export default {
  title: "Basic/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div className="flex w-full justify-center py-8">
    <Tooltip {...args} content={<>Tooltip content</>}>
      <p>Hover me</p>
    </Tooltip>
  </div>
);

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

export const AlignStart = Template.bind({});

AlignStart.args = {
  align: "start",
};

export const AlignCenter = Template.bind({});

AlignCenter.args = {
  align: "center",
};

export const AlignEnd = Template.bind({});

AlignEnd.args = {
  align: "end",
};

export const SideTop = Template.bind({});

SideTop.args = {
  side: "top",
};

export const SideRight = Template.bind({});

SideRight.args = {
  side: "right",
};

export const SideBottom = Template.bind({});

SideBottom.args = {
  side: "bottom",
};

export const SideLeft = Template.bind({});

SideLeft.args = {
  side: "left",
};

export const WithAlignOffset = Template.bind({});

WithAlignOffset.args = {
  align: "start",
  alignOffset: 20,
};

export const WithSideOffset = Template.bind({});

WithSideOffset.args = {
  side: "bottom",
  sideOffset: 20,
};
