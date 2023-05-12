import { useDisconnect } from "wagmi";

import { CHAIN } from "@constants/chains";
import { getAddressExplorerLink } from "@constants/urls";
import CopyIcon from "@icons/copy.svg";
import DisconnectIcon from "@icons/disconnect.svg";
import ExternalLinkIcon from "@icons/externallink.svg";
import { copyToClipboard } from "@utils/copy-to-clipboard";

import { Address } from "../address";
import { AddressAvatar } from "../address-avatar";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownItem,
} from "../basic/dropdown";

interface WalletDropdownProps {
  address: `0x${string}`;
}

export const WalletDropdown = ({ address }: WalletDropdownProps) => {
  const { disconnect } = useDisconnect();

  return (
    <Dropdown className="inline-flex">
      <DropdownTrigger className="rounded-btn flex items-center gap-2 bg-base-200 px-4 py-1.5 hover:bg-base-300">
        <Address address={address} />
        <AddressAvatar address={address} />
      </DropdownTrigger>
      <DropdownContent className="right-0 mt-2">
        <DropdownItem
          onClick={() => copyToClipboard(address)}
          as="button"
          className="gap-2 text-sm"
        >
          <CopyIcon className="text-lg" />
          Copy address
        </DropdownItem>
        <DropdownItem
          href={getAddressExplorerLink(CHAIN.id, address)}
          target="_blank"
          rel="noopener noreferrer"
          as="a"
          className="gap-2 text-sm"
        >
          <ExternalLinkIcon className="text-lg" />
          See in explorer
        </DropdownItem>
        <DropdownItem
          as="button"
          onClick={() => disconnect()}
          className="gap-2 text-sm"
        >
          <DisconnectIcon className="text-lg" />
          Disconnect
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
