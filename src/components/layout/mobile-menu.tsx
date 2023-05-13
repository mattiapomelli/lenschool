import { Transition } from "@headlessui/react";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container } from "@components/layout/container";

import type { Dispatch, SetStateAction } from "react";

interface NavItemProps {
  text: string;
  href: string;
  onClick?: () => void;
}

const NavItem = ({ text, href, onClick }: NavItemProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={cx(
        "rounded-btn flex items-center py-2 px-4 font-medium hover:bg-base-200",
        {
          "bg-base-200": router.pathname === href,
        },
      )}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

interface MobileMenuProps {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const MobileMenu = ({
  showMenu,
  setShowMenu,
  className,
}: MobileMenuProps) => {
  const closeMenu = () => setShowMenu(false);

  return (
    <Transition
      show={showMenu}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={className}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 top-[6.25rem] z-20 bg-black opacity-20"
        onClick={closeMenu}
      />
      <div className="rounded-b-box absolute top-full z-30 w-full bg-base-100 pb-6">
        <Container>
          <nav className="flex flex-col space-y-2">
            <NavItem text="Create course" href="/create" onClick={closeMenu} />
          </nav>
        </Container>
      </div>
    </Transition>
  );
};
