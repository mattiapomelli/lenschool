import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSwitchNetwork } from "wagmi";

import { Button } from "@components/basic/button";
import { CHAIN } from "@constants/chains";

import { WalletDropdown } from "./wallet-dropdown";

export const WalletStatus = () => {
  const { address } = useAccount();

  const { switchNetwork } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal }) => {
        const connected = account && chain;

        if (chain?.unsupported) {
          return (
            <Button
              size="sm"
              color="error"
              onClick={() => switchNetwork?.(CHAIN.id)}
              type="button"
            >
              Switch to {CHAIN.name}
            </Button>
          );
        }

        if (connected && address) {
          return <WalletDropdown address={address} />;
        }

        return <Button onClick={openConnectModal}>Connect Wallet</Button>;
      }}
    </ConnectButton.Custom>
  );
};
