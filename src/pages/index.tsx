import { CourseCatalog } from "@components/course/course-catalog";
import { TopLearners } from "@components/profile/top-learners";
import { TopTeachers } from "@components/profile/top-teachers";

const CoursesPage = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Learn with your frens 🚀
      </h1>
      <div className="flex flex-col gap-10 md:flex-row">
        <CourseCatalog className="flex-1" />
        <div className="flex w-[300px] flex-col gap-6">
          <TopTeachers className="w-full" />
          <TopLearners className="w-full" />
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
