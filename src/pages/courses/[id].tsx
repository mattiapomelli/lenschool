import { ethers } from "ethers";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Tabs } from "@components/basic/tabs";
import { CourseForum } from "@components/course/course-forum";
import { CoursePlayer } from "@components/course/course-player";
import { CourseStudentsList } from "@components/course/course-students-list";

import type { Course } from "@lib/courses/types";

const CourseInfo = ({ course }: { course: Course }) => {
  const { address } = useAccount();
  const hasPurchasedCourse = true;

  const onBuyCourse = async () => {};

  const items = [
    {
      label: "Enrolled Students",
      content: <CourseStudentsList />,
    },
    {
      label: "Forum",
      content: <CourseForum />,
    },
  ];

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
                src="data:image/png;base64,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"
                layout="fill"
                objectFit="cover"
                alt="Profile"
                priority
              />
            </div>
            <h4 className="mt-1 text-lg font-semibold">mattia</h4>
          </div>
          <p className="mt-4">{course.metadata.description}</p>
        </div>

        <div className="flex w-full flex-1 items-center justify-center p-10">
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
        </div>
      </div>

      <div className="mt-14">
        <Tabs items={items} />
      </div>
    </div>
  );
};

const course: Course = {
  id: 1,
  seller: "0x8d960334c2EF30f425b395C1506Ef7c5783789F3",
  dataUri: "QmcukPbbUN1YmxE5g8EnCjgkeUdV8LsKifnAo1t7iTSxdD",
  price: ethers.utils.parseEther("0.0001"),
  metadata: {
    title: "Web3 Development 101",
    description:
      "This course will teach you the basics of web3 development. You will learn how to build a simple smart contract and how to interact with it using a web3 provider.",
    // description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, velit rerum reprehenderit natus omnis eligendi iure amet fugit assumenda cumque id ad qui quos alias odit iusto provident. Nostrum accusamus quae iure quod maiores!',
    imageUrl:
      "https://yvgbeqzuvfqmewtltglq.supabase.co/storage/v1/object/public/public/smart-contract-dev-cover.png",
    keywords: ["web3", "solidity"],
    videoPlaybackId: "1806vd0wgt1rmgmo",
  },
};

const CoursePageInner = ({ courseId }: { courseId: number }) => {
  // const { data: course } = useCourse(courseId);

  // if (!course) {
  //   return (
  //     <div className="flex justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return <CourseInfo course={course} />;
};

const CoursePage = () => {
  const router = useRouter();
  const courseId = router.query.id?.toString();

  if (!courseId) return null;

  return <CoursePageInner courseId={Number(courseId)} />;
};

export default CoursePage;
