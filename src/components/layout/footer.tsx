import React from "react";

import { Container } from "@components/layout/container";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex  items-center justify-center border-t border-base-300/50 py-6 text-sm">
          <p className="order-1 basis-full text-center md:order-none md:basis-auto">
            My dApp
          </p>
        </div>
      </Container>
    </footer>
  );
};
