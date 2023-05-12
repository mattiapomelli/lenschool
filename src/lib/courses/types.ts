import type { BigNumber } from "ethers";

export interface Course {
  id: number;
  seller: `0x${string}`;
  price: BigNumber;
  dataUri: string;
  metadata: CourseMetadata;
}

export interface CourseMetadata {
  title: string;
  description: string;
  imageUrl: string;
  keywords: string[];
  videoPlaybackId: string;
}
