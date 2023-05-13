import { ethers } from "ethers";
import Image from "next/legacy/image";
import Link from "next/link";

import type { CourseWithPublication } from "@lib/courses/types";

interface CourseCardProps {
  course: CourseWithPublication;
  linkToPage?: boolean;
}

const hashColors = new Map();
hashColors.set("AI", "green");
hashColors.set("Arts and Humanities", "red");
hashColors.set("Web3", "blue");
hashColors.set("Data Science", "orange");
hashColors.set("Health", "blue");

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
          By:{" "}
          {/* <Link
            href={`/user/${course.publication.profile.handle.replace(
              ".test",
              "",
            )}`}
          > */}
          <span className="font-bold">{course.publication.profile.handle}</span>
          {/* </Link> */}
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
      <div className="mt-1.5 flex space-x-2">
        {course.metadata.keywords.map((keyword) => {
          if (hashColors.has(keyword)) {
            return (
              <div
                key={keyword}
                className={`w-fit rounded bg-${hashColors.get(
                  keyword,
                )}-200 text-sm text-${hashColors.get(
                  keyword,
                )}-900 py-1 px-3 mb-3`}
              >
                {keyword}
              </div>
            );
          }
        })}
      </div>
    </Link>
  );
};
