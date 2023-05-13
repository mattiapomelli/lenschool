import { useEffect } from "react";

import { CourseCatalog } from "@components/course/course-catalog";
import { TopLearners } from "@components/profile/top-learners";
import { TopTeachers } from "@components/profile/top-teachers";

const CoursesPage = () => {
  useEffect(() => {
    console.log(
      "Transactions in catalog: ",
      localStorage.getItem("lens.development.transactions"),
    );
  }, []);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Learn with your frens 🚀
      </h1>
      <div className="flex gap-10">
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
