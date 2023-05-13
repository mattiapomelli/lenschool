import {
  useActiveProfile,
  useCreatePost,
  CollectPolicyType,
  ContentFocus,
  NftAttributeDisplayType,
  ProfileOwnedByMe,
} from "@lens-protocol/react-web";
import { useMutation } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { uploadToIPFS } from "@utils/ipfs";
import { upload } from "@utils/upload";
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
  const { data: profile, loading } = useActiveProfile();
  // @ts-ignore
  const {
    execute: create,
    error,
    isPending,
  } = useCreatePost({ publisher: profile as ProfileOwnedByMe, upload });
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
        // imageUrl,
        keywords,
        videoPlaybackId,
      });

      if (!dataUri) return;

      const tx = await knowledgeLayerCourse.createCourse(price, dataUri);
      const receipt = await tx.wait();
      const id = receipt.events?.find((e) => e.event === "CourseCreated")?.args
        ?.courseId;

      const result = await create({
        content:
          description +
          " " +
          keywords.map((k) => "#" + k).join(" ") +
          " #lenschooldev",
        contentFocus: ContentFocus.TEXT,
        locale: "en",
        collect: {
          type: CollectPolicyType.FREE,
          metadata: {
            name: title,
            description,
            attributes: [
              {
                // displayType: NftAttributeDisplayType.String,
                // @ts-ignore
                displayType: "Number",
                value: id,
                traitType: "CourseId",
              },
            ],
          },
          followersOnly: true,
        },
      });

      return receipt;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
