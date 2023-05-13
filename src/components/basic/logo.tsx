import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

export interface LogoProps {
  href?: string;
  className?: string;
}

export const Logo = ({ href = "/", className }: LogoProps) => {
  return (
    <Link href={href} className="flex items-center gap-3">
      <Image src="/lenschool-logo.svg" height={40} width={40} alt="Lenschool" />
      {/* <span className="block h-7 w-7 rounded-full bg-primary" /> */}
      <span className={cx("font-extrabold text-2xl", className)}>
        Lenschool
      </span>
    </Link>
  );
};
