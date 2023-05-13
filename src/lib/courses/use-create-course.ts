import { useMutation } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { uploadToIPFS } from "@utils/ipfs";
import { uploadImage } from "@utils/upload-image";
import { upload } from "@utils/upload";

import type { BigNumber, ContractReceipt } from "ethers";
import { ethers } from "ethers";

import {
  useActiveProfile,
  useCreatePost,
  CollectPolicyType,
  ContentFocus,
  ProfileOwnedByMe,
  Amount,
  useCurrencies,
  Matic,
  Erc20,
} from "@lens-protocol/react-web";

import { LENSCHOOL_TAG } from "@constants/lens";

export interface CreateCourseData {
  title: string;
  price: BigNumber;
  referral: number;
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
  const { data: currencies } = useCurrencies();
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
      referral,
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
          ` ${LENSCHOOL_TAG}`,
        contentFocus: ContentFocus.TEXT,
        locale: "en",
        collect: {
          type: CollectPolicyType.CHARGE,
          fee: Amount.erc20(
            currencies?.find((c) => c.symbol === "WMATIC") as Erc20,
            ethers.utils.formatEther(price),
          ),
          mirrorReward: referral,
          timeLimited: false,
          followersOnly: true,
          recipient: profile?.ownedBy as string,
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
        },
      });

      console.log("Post created", result);

      console.log(
        "Transactions: ",
        localStorage.getItem("lens.development.transactions"),
      );
      localStorage.removeItem("lens.development.transactions");

      return receipt;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
