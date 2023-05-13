import { Spinner } from "@components/basic/spinner";
import { ProfileCard } from "@components/profile/profile-card";
import { useStudentsEnrolled } from "@lib/courses/use-enrolled-students";

const CourseStudentsListInner = ({
  publicationId,
}: {
  publicationId: string;
}) => {
  const { data: students, loading } = useStudentsEnrolled(publicationId);

  if (loading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (students?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No students yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-autofill">
      {students?.map((student) => (
        <ProfileCard key={student.address} profile={student} />
      ))}
    </div>
  );
};

interface CourseStudentsListProps {
  publicationId: string;
  className?: string;
}

export const CourseStudentsList = ({
  className,
  publicationId,
}: CourseStudentsListProps) => {
  return (
    <div className={className}>
      <h4 className="mb-5 text-xl font-bold">
        Meet and connect with your fellow learners
      </h4>
      <CourseStudentsListInner publicationId={publicationId} />
    </div>
  );
};
