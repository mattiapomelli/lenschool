import cx from "classnames";
import { twMerge } from "tailwind-merge";
import { useEnsName } from "wagmi";

interface AddressProps {
  address: `0x${string}`;
  className?: string;
}

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const Address = ({ address, className }: AddressProps) => {
  const { data: ensName } = useEnsName({ address });

  return (
    <span className={twMerge(cx("font-medium", className))}>
      {ensName ?? formatAddress(address)}
    </span>
  );
};
