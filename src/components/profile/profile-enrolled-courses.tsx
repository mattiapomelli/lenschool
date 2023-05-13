import { Profile } from "@lens-protocol/react-web";

import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course/course-card";
import { useEnrolledCourses } from "@lib/courses/use-enrolled-courses";

interface ProfileEnrolledCoursesInnerProps {
  profile: Profile;
}

const ProfileEnrolledCoursesInner = ({
  profile,
}: ProfileEnrolledCoursesInnerProps) => {
  const { data: courses, isLoading } = useEnrolledCourses(profile);

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (courses?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No courses yet</p>
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

interface ProfileEnrolledCoursesProps {
  className?: string;
  profile: Profile;
}

export const ProfileEnrolledCourses = ({
  className,
  profile,
}: ProfileEnrolledCoursesProps) => {
  return (
    <div className={className}>
      <h4 className="mb-4 mt-2 text-xl font-bold">
        What {profile.handle} is learning right now
      </h4>
      <ProfileEnrolledCoursesInner profile={profile} />
    </div>
  );
};
