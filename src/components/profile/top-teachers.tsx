import cx from "classnames";

import { Spinner } from "@components/basic/spinner";
import { useTopTeachers } from "@lib/profiles/use-top-teachers";

import { ProfileSmallCard } from "./profile-small-card";

const TopTeachersInner = () => {
  const { data: teachers, isLoading } = useTopTeachers();

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (teachers?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No teachers yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-autofill flex-col gap-4 md:flex">
      {teachers?.map((teacher) => (
        <ProfileSmallCard key={teacher.handle} profile={teacher} />
      ))}
    </div>
  );
};

export const TopTeachers = ({ className }: { className?: string }) => {
  return (
    <div>
      <h4 className={cx("mb-4 mt-2 text-xl font-bold", className)}>Teachers</h4>
      <TopTeachersInner />
    </div>
  );
};
