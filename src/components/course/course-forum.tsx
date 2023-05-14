import { Fragment } from "react";

import { Spinner } from "@components/basic/spinner";
import { useCourseComments } from "@lib/courses/use-course-comments";

import { CourseComment } from "./course-comment";
import { CreateCommentForm } from "./create-comment-form";

const CourseForumInner = ({ publicationId }: { publicationId: string }) => {
  const { data: comments, loading } = useCourseComments(publicationId);

  if (loading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  // if (comments?.length === 0)
  //   return (
  //     <div className="flex flex-col justify-center">
  //       <p>No discussions yet</p>
  //       <CreateCommentForm pubId={publicationId} />
  //     </div>
  //   );

  return (
    <div className="flex flex-col gap-10">
      {comments?.map((comment) => (
        <Fragment key={comment.id}>
          <CourseComment key={comment.id} comment={comment} />
          {/* <div className="h-px bg-base-300" /> */}
        </Fragment>
      ))}
      <CreateCommentForm pubId={publicationId} />
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
        Discuss about the course with your fellow learners
      </h4>
      <CourseForumInner publicationId={publicationId} />
    </div>
  );
};
