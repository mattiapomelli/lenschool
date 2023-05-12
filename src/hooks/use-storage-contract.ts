import { useContract, useProvider, useSigner } from "wagmi";

import { StorageAbi } from "@abis/storage";
import { STORAGE_ADDRESS } from "@constants/addresses";
import { CHAIN } from "@constants/chains";

export const useKnowledgeLayerCourse = (withSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: STORAGE_ADDRESS[CHAIN.id],
    abi: StorageAbi,
    signerOrProvider: withSigner ? signer : provider,
  });
};
