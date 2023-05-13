import { Profile } from "@lens-protocol/react-web";

import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course/course-card";
import { useCreatedCourses } from "@lib/courses/use-created-courses";

interface ProfileCreatedCoursesInnerProps {
  profile: Profile;
}

const ProfileCreatedCoursesInner = ({
  profile,
}: ProfileCreatedCoursesInnerProps) => {
  const { data: courses, isLoading } = useCreatedCourses(profile);

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!courses || courses?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No created courses yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-autofill">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} linkToPage />
      ))}
    </div>
  );
};

interface ProfileCreatedCoursesProps {
  className?: string;
  profile: Profile;
}

export const ProfileCreatedCourses = ({
  className,
  profile,
}: ProfileCreatedCoursesProps) => {
  return (
    <div className={className}>
      <h4 className="mb-4 mt-2 text-xl font-bold">
        What {profile.handle} is teaching
      </h4>
      <ProfileCreatedCoursesInner profile={profile} />
    </div>
  );
};
