import Link from "next/link";

import { Button } from "@components/basic/button";
import LensLogo from "@icons/lens-logo.svg";

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center gap-6 py-36 text-center">
      <h1 className="max-w-[42rem] text-4xl font-bold md:text-5xl">
        The place to learn together with your{" "}
        <span className="text-primary">frens</span> 🎓 🌿
      </h1>
      <p className="max-w-[20rem] text-xl text-base-content-neutral sm:max-w-[36rem]">
        Lenschool is a social learning platform to make online education more
        fun, collaborative and effective.
        {/* Online education is the future, but lacks the social aspect and
        interaction that in-person education provides. Lenschool bring social
        elements to online education. */}
      </p>
      <Link href="/courses">
        <Button size="lg">Start learning</Button>
      </Link>
      <LensLogo className="absolute bottom-[10%] left-[10%] h-16 w-16 rotate-[5deg] text-primary opacity-80 md:bottom-[20%]" />
      <LensLogo className="absolute right-[-20px] top-[36%] h-14 w-14 rotate-[-20deg] text-primary opacity-80 md:right-[8%]" />
      <LensLogo className="absolute left-[40%] top-[0%] h-14 w-14 rotate-12 text-primary opacity-80" />
    </section>
  );
};
