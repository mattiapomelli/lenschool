import { ethers } from "ethers";

// import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course/course-card";
import { Course } from "@lib/courses/types";

const courses: Course[] = [
  {
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
      videoPlaybackId: "85f5y6aygrxlmhxn",
    },
  },
  {
    id: 2,
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
      videoPlaybackId: "85f5y6aygrxlmhxn",
    },
  },
];

const CourseCatalogInner = () => {
  // const { data: courses, isLoading } = useCourses();

  // if (isLoading) {
  //   return (
  //     <div className="my-14 flex justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

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

export const CourseCatalog = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h4 className="mb-4 mt-2 text-xl font-bold">Courses</h4>
      <CourseCatalogInner />
    </div>
  );
};
