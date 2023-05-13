import { ethers } from "ethers";
import { erc721ABI } from "wagmi";

import { RPC_URL } from "@constants/urls";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    console.log("Body: ", req.body);

    const { accessKey } = req.body;
    const { userAddress, collectNFTAddress, chainId, seller } =
      JSON.parse(accessKey);

    if (!userAddress) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (userAddress === seller) {
      return res.status(200).send({ message: "Ok" });
    }

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL[chainId]);
    const collectNFT = new ethers.Contract(
      collectNFTAddress,
      erc721ABI,
      provider,
    );

    const balance = await collectNFT.balanceOf(userAddress);

    if (balance.gt(0)) {
      return res.status(200).send({ message: "Ok" });
    }

    return res.status(401).send({ message: "Unauthorized" });
  } else {
    return res.status(405).send({ message: "Method not allowed" });
  }
}
