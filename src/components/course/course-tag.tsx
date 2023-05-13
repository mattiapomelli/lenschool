import cx from "classnames";

const topicClassname: Record<string, string> = {
  AI: "bg-green-500 text-green-900 dark:text-green-200",
  "Arts and Humanities": "bg-red-500 text-red-900 dark:text-red-200",
  Web3: "bg-blue-500 text-blue-900 dark:text-blue-200",
  "Data Science": "bg-orange-500 text-orange-900 dark:text-orange-200",
  Health: "bg-yellow-500 text-yellow-900 dark:text-red-200",
};

interface CourseTagProps {
  topic: string;
  onClick?: (topic: string) => void;
  showHahtag?: boolean;
  selected?: boolean;
  className?: string;
}

export const CourseTag = ({
  onClick,
  topic,
  showHahtag,
  selected,
  className,
}: CourseTagProps) => {
  return (
    <button
      onClick={() => onClick?.(topic)}
      className={cx(
        onClick !== undefined ? "cursor-pointer" : "cursor-default",
        "rounded  px-3 py-1 text-sm ",
        selected ? "bg-opacity-80" : "bg-opacity-30",
        topicClassname[topic],
        className,
      )}
    >
      {showHahtag && "#"}
      {topic}
    </button>
  );
};
