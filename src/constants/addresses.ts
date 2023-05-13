import { hardhat, polygon, polygonMumbai } from "wagmi/chains";

export const KNOWLEDGELAYER_COURSE_ADDRESS: {
  [chainId: number]: `0x${string}`;
} = {
  [hardhat.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  [polygonMumbai.id]: "0xe2E48da5b7ea04123bb0DCD106B295A818D63aBf",
  [polygon.id]: "0x7e18f7e10781f8DaeB980C8Cf99ebb8415F9d02e",
};
