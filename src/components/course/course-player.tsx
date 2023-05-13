import { Player } from "@livepeer/react";
import { useAccount } from "wagmi";

import { CHAIN } from "@constants/chains";

import type { CourseWithPublication } from "@lib/courses/types";

interface CoursePlayerProps {
  course: CourseWithPublication;
  className?: string;
}

export const CoursePlayer = ({ course, className }: CoursePlayerProps) => {
  const { address } = useAccount();

  return (
    <div className={className}>
      <Player
        playbackId={course.metadata.videoPlaybackId}
        accessKey={JSON.stringify({
          userAddress: address,
          collectNFTAddress: course.publication.collectNftAddress,
          chainId: CHAIN.id,
          seller: course.seller,
        })}
      />
    </div>
  );
};
