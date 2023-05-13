import Image from "next/image";
import { ReactNode } from "react";

interface TechnologyCardProps {
  logo: ReactNode;
  text: string;
}

const TechnologyCard = ({ logo, text }: TechnologyCardProps) => {
  return (
    <div className="flex h-20 items-center gap-10">
      {logo}
      <p className="text-2xl">{text}</p>
    </div>
  );
};

export const TechnologiesSecion = () => {
  return (
    <section className="flex flex-col items-center gap-10 py-32">
      <h3 className="max-w-[30rem] text-center text-3xl font-bold">
        Powered by
      </h3>
      <div className="flex flex-col items-center gap-8">
        <TechnologyCard
          logo={
            <Image src="/lens-logo.svg" width={54} height={73} alt="Lens" />
          }
          text="The core for social features"
        />
        <TechnologyCard
          logo={
            <Image
              src="/worldcoin-logo.svg"
              height={24}
              width={141}
              alt="Worldcoin"
            />
          }
          text="Proving that teachers are humans"
        />
        <TechnologyCard
          logo={<span className="text-2xl font-black">KnowledgeLayer</span>}
          text="The core for course creation"
        />
        <TechnologyCard
          logo={
            <Image src="/safe-logo.svg" width={126} height={48} alt="Safe" />
          }
          text="Fiat on-ramp for buying courses"
        />
        <TechnologyCard
          logo={
            <Image
              src="/airstack-logo.png"
              width={168}
              height={40}
              alt="Airstack"
            />
          }
          text="Token gating"
        />
      </div>
    </section>
  );
};
