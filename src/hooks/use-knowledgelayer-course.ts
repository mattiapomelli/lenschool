import { useContract, useProvider, useSigner } from "wagmi";

import { KnowledgeLayerCourseAbi } from "@abis/knowledgelayer-course";
import { CHAIN } from "@constants/chains";

import { KNOWLEDGELAYER_COURSE_ADDRESS } from "../constants/addresses";

import type { KnowledgeLayerCourse } from "@abis/types/knowledgelayer-course";

export const useKnowledgeLayerCourse = (withSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: KNOWLEDGELAYER_COURSE_ADDRESS[CHAIN.id],
    abi: KnowledgeLayerCourseAbi,
    signerOrProvider: withSigner ? signer : provider,
  }) as KnowledgeLayerCourse | null;
};
