import {
  publicationId,
  useWhoCollectedPublication,
} from "@lens-protocol/react-web";

export const useStudentsEnrolled = (pubId: string) => {
  return useWhoCollectedPublication({
    publicationId: publicationId(pubId),
  });
};
