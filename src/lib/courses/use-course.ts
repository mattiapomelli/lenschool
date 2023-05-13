import {
  CollectablePost,
  Post,
  publicationId,
  usePublication,
} from "@lens-protocol/react-web";
import { useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { fetchFromIpfs } from "@utils/ipfs";

import {
  Course,
  CourseMetadata,
  CourseWithPublicationAndReferral,
} from "./types";

export const useCourse = (pubId: string) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  const { data: publication, loading } = usePublication({
    publicationId: publicationId(pubId),
  });

  const query = useQuery<CourseWithPublicationAndReferral | undefined>(
    ["course", pubId],
    async () => {
      if (!knowledgeLayerCourse || !publication) return;

      let postPublication: Post | undefined;
      let isReferral = false;

      if (
        publication.__typename === "Mirror" &&
        publication.mirrorOf.__typename === "Post"
      ) {
        postPublication = publication.mirrorOf;
        isReferral = true;
      } else if (publication.__typename === "Post") {
        postPublication = publication;
      } else {
        return;
      }

      const courseId = Number(
        (postPublication as CollectablePost).metadata.attributes.find(
          (attr) => attr.traitType === "CourseId",
        )?.value,
      );

      const { seller, price, dataUri } = await knowledgeLayerCourse.courses(
        courseId,
      );
      const course: Omit<Course, "metadata"> = {
        id: courseId,
        seller: seller as `0x${string}`,
        price,
        dataUri,
      };

      /* Get course metadata */
      const metadata = await fetchFromIpfs<CourseMetadata>(dataUri);

      const courseWithPublication: CourseWithPublicationAndReferral = {
        ...course,
        metadata,
        publication: postPublication as CollectablePost,
        isReferral,
      };

      return courseWithPublication;
    },
    {
      enabled: !loading,
    },
  );

  return {
    ...query,
    isLoading: query.isLoading || loading,
  };
};
