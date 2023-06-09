import {
  CollectablePost,
  Post,
  useSearchPublications,
} from "@lens-protocol/react-web";
import { useQuery } from "wagmi";

import { LENSCHOOL_TAG } from "@constants/lens";
import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { fetchFromIpfs } from "@utils/ipfs";

import { Course, CourseMetadata, CourseWithPublication } from "./types";

export const useCourses = () => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  const { data: publications, loading } = useSearchPublications({
    query: LENSCHOOL_TAG,
    limit: 50,
  });

  // console.log("Publications: ", publications);

  const query = useQuery<CourseWithPublication[]>(
    ["courses"],
    async () => {
      if (!knowledgeLayerCourse || !publications) return [];

      const courseIds = (publications as Post[]).map((publication) => {
        const courseId = publication.metadata.attributes.find(
          (attr) => attr.traitType === "CourseId",
        )?.value;
        return Number(courseId);
      });

      console.log("CourseIds: ", courseIds);

      const coursesStructs = await Promise.all(
        courseIds.map((courseId) => knowledgeLayerCourse.courses(courseId)),
      );
      const courses: Omit<Course, "metadata">[] = coursesStructs.map(
        ({ seller, price, dataUri }, index) => ({
          id: courseIds[index],
          seller: seller as `0x${string}`,
          price,
          dataUri,
        }),
      );

      /* Get courses metadata */
      const coursesMetadata = await Promise.all(
        courses.map((course) => fetchFromIpfs<CourseMetadata>(course.dataUri)),
      );

      const coursesWithPublication: CourseWithPublication[] = (
        publications as CollectablePost[]
      ).map((publication, index) => ({
        ...courses[index],
        metadata: coursesMetadata[index],
        publication,
      }));

      return coursesWithPublication.filter((publication, index) => {
        const existingIndex = coursesWithPublication.findIndex(
          (p) => publication.id === p.id,
        );
        return existingIndex === index;
      });
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
