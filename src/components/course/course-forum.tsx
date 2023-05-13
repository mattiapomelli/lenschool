import { Spinner } from "@components/basic/spinner";
import { useCourseComments } from "@lib/courses/use-course-comments";

import { CourseComment } from "./course-comment";
import { CreateCommentForm } from "./create-comment-form";

const CourseForumInner = ({ publicationId }: { publicationId: string }) => {
  const { data: comments, loading } = useCourseComments(publicationId);

  console.log("Comments: ", comments);

  if (loading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (comments?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No comments yet</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      {comments?.map((comment) => (
        <CourseComment key={comment.id} comment={comment} />
      ))}
      <CreateCommentForm />
    </div>
  );
};

interface CourseForumProps {
  publicationId: string;
  className?: string;
}
export const CourseForum = ({ className, publicationId }: CourseForumProps) => {
  return (
    <div className={className}>
      <h4 className="mb-5 text-xl font-bold">
        Discuss about course content with your fellow learners
      </h4>
      <CourseForumInner publicationId={publicationId} />
    </div>
  );
};
