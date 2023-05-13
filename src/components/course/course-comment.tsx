import { CommentWithFirstComment } from "@lens-protocol/react-web";
import Image from "next/legacy/image";

import { getPictureURL } from "@utils/ipfs-to-gateway-url";

interface CourseCommentProps {
  comment: CommentWithFirstComment;
}

export const CourseComment = ({ comment }: CourseCommentProps) => {
  return (
    <div className="rounded-box flex flex-col gap-2 bg-base-200 p-4">
      <div className="flex items-center gap-2">
        <div className="relative mt-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={getPictureURL(comment.profile)}
            layout="fill"
            objectFit="cover"
            alt="Profile"
            priority
          />
        </div>
        <h4 className="mt-1 text-lg font-semibold">{comment.profile.handle}</h4>
      </div>

      <p className="text-base-content/70">{comment.metadata.content}</p>
    </div>
  );
};
