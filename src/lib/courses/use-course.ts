import { Post, publicationId, usePublication } from "@lens-protocol/react-web";
import { useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { fetchFromIpfs } from "@utils/ipfs";

import { Course, CourseMetadata, CourseWithPublication } from "./types";

export const useCourse = (pubId: string) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  const { data: publication, loading } = usePublication({
    publicationId: publicationId(pubId),
  });

  const query = useQuery<CourseWithPublication | undefined>(
    ["course", pubId],
    async () => {
      if (!knowledgeLayerCourse || !publication) return;

      const courseId = Number(
        (publication as Post).metadata.attributes.find(
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

      const courseWithPublication: CourseWithPublication = {
        ...course,
        metadata,
        publication: publication as Post,
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
