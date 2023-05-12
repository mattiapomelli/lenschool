import { hardhat, polygonMumbai } from "wagmi/chains";

import { env } from "env.mjs";

export type ChainMap = { [chainId: number]: string };

const getChain = () => {
  switch (env.NEXT_PUBLIC_CHAIN) {
    case "localhost":
      return hardhat;
    case "testnet":
      return polygonMumbai;
    default:
      throw new Error("Invalid NEXT_PUBLIC_CHAIN value");
  }
};

export const CHAIN = getChain();
