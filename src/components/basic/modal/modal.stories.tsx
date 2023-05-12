import { ComponentStory, ComponentMeta } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "@components/basic/button";
import { Modal } from "@components/basic/modal";

export default {
  title: "Basic/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        Modal Content
      </Modal>
    </>
  );
};

export const Default = Template.bind({});

export const WithTitle = Template.bind({});

WithTitle.args = {
  title: "Modal Title",
};
