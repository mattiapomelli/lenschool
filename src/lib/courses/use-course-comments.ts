import { publicationId, useComments } from "@lens-protocol/react-web";

export const useCourseComments = (pubId: string) => {
  return useComments({
    commentsOf: publicationId(pubId),
  });
};
