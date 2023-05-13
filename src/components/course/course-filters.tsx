import { FormEvent } from "react";

export const CourseFilters = ({
  topic,
  setTopic,
}: {
  topic: string;
  setTopic: Function;
}) => {
  const handleSetTopic = async (event: FormEvent, topic: string) => {
    event.preventDefault();
    setTopic(topic);
  };

  return (
    <div className="flex space-x-2">
      <div
        onClick={(e) => handleSetTopic(e, "AI")}
        className="cursor-pointer rounded bg-green-200 text-sm text-green-900 py-1 px-3 mb-3"
      >
        #AI
      </div>
      <div
        onClick={(e) => handleSetTopic(e, "Arts")}
        className="cursor-pointer rounded bg-red-200 text-sm text-red-900 py-1 px-3 mb-3"
      >
        #Arts and Humanities
      </div>
      <div
        onClick={(e) => handleSetTopic(e, "Web3")}
        className="cursor-pointer rounded bg-blue-200 text-sm text-blue-900 py-1 px-3 mb-3"
      >
        #Web3
      </div>
      <div
        onClick={(e) => handleSetTopic(e, "Data Science")}
        className="cursor-pointer rounded bg-orange-200 text-sm text-orange-900 py-1 px-3 mb-3"
      >
        #Data Science
      </div>
      <div
        onClick={(e) => handleSetTopic(e, "Health")}
        className="cursor-pointer rounded bg-blue-200 text-sm text-blue-900 py-1 px-3 mb-3"
      >
        #Health
      </div>
      <div
        onClick={(e) => handleSetTopic(e, "")}
        className="cursor-pointer rounded bg-gray-200 text-sm text-gray-900 py-1 px-3 mb-3"
      >
        Clear
      </div>
    </div>
  );
};
