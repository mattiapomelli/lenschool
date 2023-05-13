import { Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";

import { Logo } from "@components/basic/logo";
import { ThemeToggle } from "@components/basic/theme-toggle";
import { useTransitionControl } from "@hooks/use-transition-control";

import { Container } from "./container";
import { LensLogin } from "./lens-login";
import { MobileMenu } from "./mobile-menu";

interface NavItemProps {
  text: string;
  href: string;
}

const NavItem = ({ text, href }: NavItemProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={cx("rounded-btn py-2 px-4 font-medium hover:bg-base-200", {
        "bg-base-200": router.pathname.startsWith(href),
      })}
    >
      {text}
    </Link>
  );
};

export const Navbar = () => {
  const { isConnecting, isReconnecting } = useAccount();
  const [showMenu, setShowMenu] = useState(false);

  const [show] = useTransitionControl(isReconnecting || isConnecting);

  return (
    <header className="relative">
      <Container className="flex h-20 w-full items-center justify-between">
        <Logo className="hidden sm:block" />
        <Transition
          show={show}
          enter="transition-opacity duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
              <NavItem text="Feed" href="/courses" />
              <NavItem text="Create course" href="/create" />
            </div>
            <ThemeToggle />
            <LensLogin />

            <button
              onClick={() => setShowMenu((show) => !show)}
              className="rounded-btn p-1.5 hover:bg-base-200 md:hidden"
              aria-expanded="false"
            >
              <span className="sr-only">
                {showMenu ? "Close menu" : "Open menu"}
              </span>
              {showMenu ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </Transition>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        className="md:hidden"
      />
    </header>
  );
};
