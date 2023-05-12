import { hardhat, polygonMumbai } from "wagmi/chains";

import { env } from "env.mjs";

export const EXPLORER_URL: Record<number, string> = {
  [polygonMumbai.id]: "https://mumbai.polygonscan.com",
  [hardhat.id]: "",
};

export const getAddressExplorerLink = (chainId: number, address: string) => {
  return `${EXPLORER_URL[chainId]}/address/${address}`;
};

export const RPC_URL: Record<number, string> = {
  [polygonMumbai.id]: `https://polygon-mumbai.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  [hardhat.id]: "http://localhost:8545",
};
