import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course/course-card";
import { CourseFilters } from "@components/course/course-filters";
import { useCourses } from "@lib/courses/use-courses";
import { useEffect, useState } from "react";

const CourseCatalogInner = ({ topic }: { topic: string }) => {
  const { data: courses, isLoading } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    console.log("Topic: ", topic);
    if (!topic) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses?.filter((course) =>
      course.metadata.keywords.includes(topic),
    );
    setFilteredCourses(filtered);
  }, [topic, courses]);

  // console.log(courses);

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
      {filteredCourses?.map((course) => (
        <CourseCard key={course.id} course={course} linkToPage />
      ))}
    </div>
  );
};

export const CourseCatalog = ({ className }: { className?: string }) => {
  const [topic, setTopic] = useState("");
  return (
    <div className={className}>
      <div className="flex mb-4 mt-2 space-x-3">
        <h4 className="text-xl font-bold">Courses</h4>
        <CourseFilters topic={topic} setTopic={setTopic} />
      </div>
      <CourseCatalogInner topic={topic} />
    </div>
  );
};
