import { Profile, useSearchPublications } from "@lens-protocol/react-web";
import { useQuery } from "wagmi";

import { LENSCHOOL_TAG } from "@constants/lens";

export const useTopTeachers = () => {
  const { data: publications, loading } = useSearchPublications({
    query: LENSCHOOL_TAG,
  });

  const query = useQuery<Profile[]>(
    ["top-teachers"],
    async () => {
      if (!publications) return [];

      return publications
        .map((pub) => pub.profile)
        .filter((profile, index) => {
          const existingIndex = publications.findIndex(
            (p) => p.profile.id === profile.id,
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
