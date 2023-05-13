import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface ComponentCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: ComponentCardProps) => {
  return (
    <div className="rounded-box flex max-w-[20rem] flex-col gap-4 bg-base-300 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary-content bg-primary">
        <span className="h-8 w-8 text-primary-content">{icon}</span>
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-base-content-neutral">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center gap-10 py-32">
      <h3 className="max-w-[30rem] text-center text-3xl font-bold">
        Everything you need to make learning{" "}
        <span className="text-primary">fun</span> and{" "}
        <span className="text-primary">efficient</span>
      </h3>
      <p className="max-w-[28rem] text-center text-lg text-base-content-neutral">
        Studies prove that learning in groups improves retention and completion
        rates.
      </p>
      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
        <FeatureCard
          icon={<AcademicCapIcon />}
          title="Learn"
          description="Enroll in online video courses and grow your skills and knowledge"
        />
        <FeatureCard
          icon={<UserGroupIcon />}
          title="Connect"
          description="Connect with your fellow learners enrolled in the same course."
        />
        <FeatureCard
          icon={<ChatBubbleLeftRightIcon />}
          title="Discuss"
          description="Start discussions about the course content, ask questions to your teachers and peers."
        />
        <FeatureCard
          icon={<CurrencyDollarIcon />}
          title="Earn"
          description="Refer your favourite courses to your friends and earn a fee on each sale."
        />
      </div>
    </section>
  );
};
