import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  WrappedLink,
} from "@components/basic/dropdown";

export default {
  title: "Basic/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = () => (
  <div className="flex justify-center">
    <Dropdown className="inline-flex">
      <DropdownTrigger>Open</DropdownTrigger>
      <DropdownContent className="mt-8">
        <DropdownItem href="/" as={WrappedLink}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => console.log("Logout")}>
          Logout
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  </div>
);

export const Default = Template.bind({});
