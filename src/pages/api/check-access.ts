import { init, fetchQuery } from "@airstack/airstack-react";
import { ethers } from "ethers";
import { gql } from "graphql-request";
import { erc721ABI } from "wagmi";
import { polygon } from "wagmi/chains";

import { RPC_URL } from "@constants/urls";
import { env } from "env.mjs";

import type { NextApiRequest, NextApiResponse } from "next";

const getTokenBalanceQuery = gql`
  query CheckTokenOwnership($userAddress: Identity!, $nftAddress: Address!) {
    TokenBalances(
      input: {
        filter: {
          owner: { _eq: $userAddress }
          tokenAddress: { _eq: $nftAddress }
          tokenType: { _eq: ERC721 }
        }
        blockchain: polygon
        limit: 1
      }
    ) {
      TokenBalance {
        tokenAddress
        tokenId
        owner {
          addresses
        }
      }
    }
  }
`;

interface TokenBalancesResult {
  data: {
    TokenBalances: {
      TokenBalance:
        | {
            tokenAddress: string;
            tokenId: string;
            owner: {
              addresses: string[];
            };
          }[]
        | null;
    };
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  init(env.NEXT_PUBLIC_AIRSTACK_API_KEY);

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

    // Mainnet
    if (chainId === polygon.id) {
      const result: TokenBalancesResult = await fetchQuery(
        getTokenBalanceQuery,
        {
          userAddress,
          nftAddress: collectNFTAddress,
        },
      );

      if (
        result.data.TokenBalances.TokenBalance &&
        result.data.TokenBalances.TokenBalance.length > 0
      ) {
        return res.status(200).send({ message: "Ok" });
      }
    } else {
      // Testnet
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
    }

    return res.status(401).send({ message: "Unauthorized" });
  } else {
    return res.status(405).send({ message: "Method not allowed" });
  }
}
