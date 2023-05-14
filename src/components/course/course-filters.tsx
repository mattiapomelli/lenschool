import { CourseTag } from "./course-tag";

interface CourseFiltersProps {
  setTopic: (topic: string) => void;
  topic: string;
}

const topics = ["AI", "Arts and Humanities", "Web3", "Data Science", "Music"];

export const CourseFilters = ({
  setTopic,
  topic: selectedTopic,
}: CourseFiltersProps) => {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {topics.map((topic) => (
        <CourseTag
          key={topic}
          onClick={setTopic}
          topic={topic}
          selected={topic === selectedTopic}
        />
      ))}
      <div
        onClick={() => setTopic("")}
        className="rounded-btn cursor-pointer bg-gray-300 px-3 py-1 text-sm text-gray-900"
      >
        Clear
      </div>
    </div>
  );
};
