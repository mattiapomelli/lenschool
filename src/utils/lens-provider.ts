import { LensConfig, production, staging } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

export const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment:
    process.env.NEXT_PUBLIC_CHAIN === "mainnet" ? production : staging,
};
