import React from "react";

import { Container } from "@components/layout/container";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex  items-center justify-center border-t border-base-300/50 pb-10 pt-8">
          <p className="order-1 basis-full text-center md:order-none md:basis-auto">
            Lenschool - Made by{" "}
            <a
              href="https://lenster.xyz/u/mattiaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-focus"
            >
              mattiaa.lens
            </a>{" "}
            &{" "}
            <a
              href="https://lenster.xyz/u/bartomolina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-focus"
            >
              bartomolina.lens
            </a>{" "}
            🌿
          </p>
        </div>
      </Container>
    </footer>
  );
};
