import { ethers } from "ethers";
import Image from "next/legacy/image";
import Link from "next/link";

import type { CourseWithPublication } from "@lib/courses/types";

interface CourseCardProps {
  course: CourseWithPublication;
  linkToPage?: boolean;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link
      href={`/courses/${course.publication.id}`}
      key={course.id}
      className="rounded-box flex flex-col gap-2 bg-base-200 p-4 hover:bg-base-300"
    >
      <div className="rounded-box relative h-44 overflow-hidden">
        <Image
          src={course.metadata.imageUrl}
          layout="fill"
          objectFit="cover"
          alt="Course"
          priority
        />
      </div>

      <h4 className="mt-1 block text-xl font-semibold">
        {course.metadata.title}
      </h4>

      <div className="mt-1 flex items-center gap-4">
        <span>
          By: <span className="font-bold">mattia.lens</span>
        </span>
        <span>
          Price:{" "}
          <span className="font-bold">
            {ethers.utils.formatEther(course.price)} MATIC
          </span>
        </span>
      </div>

      <p className="text-base-content/70">
        {course.metadata.description.substring(0, 100).concat("...")}
      </p>
    </Link>
  );
};
