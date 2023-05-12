import { useMutation } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { uploadToIPFS } from "@utils/ipfs";
import { uploadImage } from "@utils/upload-image";

import type { BigNumber, ContractReceipt } from "ethers";

export interface CreateCourseData {
  title: string;
  price: BigNumber;
  image: File;
  description: string;
  keywords: string[];
  videoPlaybackId: string;
}

interface UseCreateCourseOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useCreateCourse = (options?: UseCreateCourseOptions) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse(true);
  const mutation = useMutation(
    async ({
      title,
      description,
      price,
      image,
      keywords,
      videoPlaybackId,
    }: CreateCourseData) => {
      if (!knowledgeLayerCourse) return;

      const imageUrl = await uploadImage(image);
      if (!imageUrl) return;

      const dataUri = await uploadToIPFS({
        title,
        description,
        imageUrl,
        keywords,
        videoPlaybackId,
      });

      if (!dataUri) return;

      const tx = await knowledgeLayerCourse.createCourse(price, dataUri);
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
