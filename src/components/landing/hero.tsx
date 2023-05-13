import Link from "next/link";

import { Button } from "@components/basic/button";
import LensLogo from "@icons/lens-logo.svg";

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center gap-6 py-36 text-center">
      <h1 className="max-w-[42rem] text-5xl font-bold">
        The place to learn together with your{" "}
        <span className="text-primary">frens</span> 🎓 🌿
      </h1>
      <p className="max-w-[20rem] text-xl text-base-content-neutral sm:max-w-[36rem]">
        Online education is the future, but lacks the social aspect and
        interaction that in-person education provides. Lenschool bring social
        elements to online education.
      </p>
      <Link href="/courses" target="_blank" rel="noreferrer">
        <Button size="lg">Start learning</Button>
      </Link>
      <LensLogo className="absolute bottom-[10%] left-[10%] h-16 w-16 md:bottom-[20%]" />
      <LensLogo className="absolute right-[-20px] top-[35%] h-14 w-14 rotate-[-20deg] md:right-[8%]" />
      <LensLogo className="absolute left-[40%] top-[0%] h-14 w-14 rotate-12" />
    </section>
  );
};
