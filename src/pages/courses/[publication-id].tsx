import { ethers } from "ethers";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { Tabs } from "@components/basic/tabs";
import { CourseForum } from "@components/course/course-forum";
import { CoursePlayer } from "@components/course/course-player";
import { CourseStudentsList } from "@components/course/course-students-list";
import { useCourse } from "@lib/courses/use-course";
import { getPictureURL } from "@utils/ipfs-to-gateway-url";

import type { CourseWithPublication } from "@lib/courses/types";

const CourseInfo = ({ course }: { course: CourseWithPublication }) => {
  const { address } = useAccount();
  const hasPurchasedCourse = course.publication.hasCollectedByMe;

  const items = [
    {
      label: "Enrolled Students",
      content: <CourseStudentsList publicationId={course.publication.id} />,
    },
    {
      label: "Discussions",
      content: <CourseForum publicationId={course.publication.id} />,
    },
  ];

  // console.log("Course: ", course);

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex-1">
          <div className="rounded-box relative h-40 overflow-hidden">
            <Image
              src={course.metadata.imageUrl}
              layout="fill"
              objectFit="cover"
              alt="course"
              priority
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold">{course.metadata.title}</h1>
          <div className="flex items-center gap-2">
            <div className="relative mt-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={getPictureURL(course.publication.profile)}
                layout="fill"
                objectFit="cover"
                alt="Profile"
                priority
              />
            </div>
            <Link
              href={`/user/${course.publication.profile.handle.replace(
                ".test",
                "",
              )}`}
            >
              <h4 className="mt-1 text-lg font-semibold hover:opacity-70">
                {course.publication.profile.handle}
              </h4>
            </Link>
          </div>
          <p className="mt-4">{course.metadata.description}</p>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 p-10">
          {hasPurchasedCourse || course.seller === address ? (
            <CoursePlayer course={course} className="w-full" />
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-center font-bold">
                {ethers.utils.formatEther(course.price)} MATIC
              </span>
              <Button size="lg">Enroll now</Button>
            </div>
          )}
          <Button color="neutral" size="lg">
            Refer course
          </Button>
        </div>
      </div>

      <div className="mt-14">
        <Tabs items={items} />
      </div>
    </div>
  );
};

const CoursePageInner = ({ publicationId }: { publicationId: string }) => {
  const { data: course, isLoading } = useCourse(publicationId);

  if (isLoading || !course) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return <CourseInfo course={course} />;
};

const CoursePage = () => {
  const router = useRouter();
  const publicationId = router.query["publication-id"]?.toString();

  if (!publicationId) return null;

  return <CoursePageInner publicationId={publicationId} />;
};

export default CoursePage;
