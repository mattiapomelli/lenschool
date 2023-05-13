import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { Button } from "@components/basic/button";
import { copyToClipboard } from "@utils/copy-to-clipboard";

import type { ButtonProps } from "@components/basic/button";

export interface CopyButtonProps extends ButtonProps {
  text: string;
  label: string;
}

export const CopyButton = ({ text, label, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopyLink = () => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      {...props}
      onClick={onCopyLink}
      rightIcon={
        copied ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <DocumentDuplicateIcon className="h-5 w-5" />
        )
      }
    >
      {copied ? "Copied!" : label}
    </Button>
  );
};
