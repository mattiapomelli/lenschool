import { Post, useSearchPublications } from "@lens-protocol/react-web";
import { useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { fetchFromIpfs } from "@utils/ipfs";

import { Course, CourseMetadata, CourseWithPublication } from "./types";

export const useCourses = () => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  const { data: publications, loading } = useSearchPublications({
    query: "lenschooldev",
  });

  const query = useQuery<CourseWithPublication[]>(
    ["courses"],
    async () => {
      if (!knowledgeLayerCourse || !publications) return [];

      const courseIds = (publications as Post[]).map((publication) => {
        return Number(
          publication.metadata.attributes.find(
            (attr) => attr.traitType === "CourseId",
          )?.value,
        );
      });

      const coursesStructs = await Promise.all(
        courseIds.map((courseId) =>
          knowledgeLayerCourse.courses(Number(courseId)),
        ),
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
        publications as Post[]
      ).map((publication, index) => ({
        ...courses[index],
        metadata: coursesMetadata[index],
        publication,
      }));

      return coursesWithPublication;
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
