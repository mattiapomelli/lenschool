import { Player } from "@livepeer/react";
import { useAccount } from "wagmi";

import { CHAIN } from "@constants/chains";

import type { Course } from "@lib/courses/types";

interface CoursePlayerProps {
  course: Course;
  className?: string;
}

export const CoursePlayer = ({ course, className }: CoursePlayerProps) => {
  const { address } = useAccount();

  return (
    <div className={className}>
      <Player
        playbackId={course.metadata.videoPlaybackId}
        accessKey={JSON.stringify({
          address,
          chainId: CHAIN.id,
          courseId: course.id,
        })}
      />
    </div>
  );
};
