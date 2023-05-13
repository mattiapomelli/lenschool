import {
  useActiveProfile,
  useCreatePost,
  CollectPolicyType,
  ContentFocus,
  ProfileOwnedByMe,
  Amount,
  useCurrencies,
  Erc20,
  // NftAttributeDisplayType,
} from "@lens-protocol/react-web";
import { ethers } from "ethers";
import { useMutation } from "wagmi";

import { LENSCHOOL_TAG } from "@constants/lens";
import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { uploadToIPFS } from "@utils/ipfs";
import { upload } from "@utils/upload";
import { uploadImage } from "@utils/upload-image";

import type { BigNumber, ContractReceipt } from "ethers";

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
  const { data: profile } = useActiveProfile();
  const { data: currencies } = useCurrencies();
  // @ts-ignore
  const { execute: create } = useCreatePost({
    publisher: profile as ProfileOwnedByMe,
    upload,
  });
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
      const id: BigNumber = receipt.events?.find(
        (e) => e.event === "CourseCreated",
      )?.args?.courseId;

      await create({
        content:
          description +
          " " +
          keywords.map((k) => "#" + k).join(" ") +
          ` #${LENSCHOOL_TAG}`,
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
          followersOnly: false,
          recipient: profile?.ownedBy as string,
          metadata: {
            name: title,
            description,
            attributes: [
              {
                // displayType: NftAttributeDisplayType.Number,
                // @ts-ignore
                displayType: "Number",
                value: id.toNumber(),
                traitType: "CourseId",
              },
            ],
          },
        },
      });

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
