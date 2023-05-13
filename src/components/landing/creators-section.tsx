import { Button } from "@components/basic/button";

export const CreatorsSection = () => {
  return (
    <section className="rounded-box flex flex-col items-center gap-6 bg-accent py-20">
      <h3 className="max-w-[34rem] text-center text-3xl font-bold">
        Are you a creator?
      </h3>
      <p className="max-w-[28rem] text-center text-lg text-base-content-neutral">
        Share and monetize your knowledge by teaching to other people. Leverage
        referral programs to reach a wider audience.
      </p>
      <a
        href="https://tiapome.notion.site/KnowledgeLayer-Manifesto-dc10fb32bfb34847a591894479f3107a"
        target="_blank"
        rel="noreferrer"
      >
        <Button>Start teaching</Button>
      </a>
    </section>
  );
};
