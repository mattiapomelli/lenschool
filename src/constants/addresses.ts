import { chain } from "wagmi";

import { ChainMap } from "./chains";

export const STORAGE_ADDRESS: ChainMap = {
  [chain.hardhat.id]: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  [chain.mainnet.id]: "",
  [chain.goerli.id]: "'",
};
