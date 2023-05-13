import {
  ProfileSortCriteria,
  useExploreProfiles,
} from "@lens-protocol/react-web";
import cx from "classnames";

import { Spinner } from "@components/basic/spinner";

import { ProfileSmallCard } from "./profile-small-card";

const TopLearnersInner = () => {
  const { data: learners, loading } = useExploreProfiles({
    sortCriteria: ProfileSortCriteria.LatestCreated,
  });

  if (loading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (learners?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No learners yet</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {learners?.map((profile) => (
        <ProfileSmallCard key={profile.handle} profile={profile} />
      ))}
    </div>
  );
};

export const TopLearners = ({ className }: { className?: string }) => {
  return (
    <div>
      <h4 className={cx("mb-4 mt-2 text-xl font-bold", className)}>Learners</h4>
      <TopLearnersInner />
    </div>
  );
};
