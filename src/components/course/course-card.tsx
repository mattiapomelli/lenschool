import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";

import { Address } from "../address";

import type { Course } from "@lib/courses/types";

interface CourseCardProps {
  course: Course;
  linkToPage?: boolean;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={`/courses/${course.id}`} key={course.id}>
      <a className="rounded-box flex flex-col gap-2 bg-base-200 p-4 hover:bg-base-300">
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
            By: <Address address={course.seller} className="font-bold" />
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
      </a>
    </Link>
  );
};