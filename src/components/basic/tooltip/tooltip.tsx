import {
  Tooltip as TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
  TooltipContentProps,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import cx from "classnames";
import { ReactNode, useEffect, useState } from "react";

const colorClassname = {
  primary: "bg-primary text-primary-content fill-primary",
  secondary: "bg-secondary text-secondary-content fill-secondary",
  accent: "bg-accent text-accent-content fill-accent",
};

export interface TooltipProps {
  color?: keyof typeof colorClassname;
  align?: TooltipContentProps["align"];
  side?: TooltipContentProps["side"];
  alignOffset?: number;
  sideOffset?: number;
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Tooltip = ({
  color = "primary",
  content,
  children,
  className,
  ...props
}: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("scroll", close);
    return () => document.removeEventListener("scroll", close);
  }, []);

  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={200} open={open}>
        <TooltipTrigger
          className={cx("cursor-pointer", className)}
          asChild
          onClick={onOpen}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          {children}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            className={cx(
              "animate-fade-in rounded-btn py-2 px-3 z-30 max-w-[90vw]",
              colorClassname[color],
            )}
            {...props}
          >
            <TooltipArrow height={8} width={14} />
            {content}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
};
