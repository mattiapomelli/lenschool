import { SafeOnRampKit, StripePack } from "@safe-global/onramp-kit";
import { useState } from "react";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";

const SafePage = () => {
  const { address } = useAccount();

  const [showButton, setShowButton] = useState(true);

  const fundWallet = async function () {
    const safeOnRamp = await SafeOnRampKit.init(
      new StripePack({
        // Get public key from Stripe: https://dashboard.stripe.com/register
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
        // Deploy your own server: https://github.com/5afe/aa-stripe-service
        onRampBackendUrl: "https://aa-stripe.safe.global",
      }),
    );

    // See options for using the StripePack open method in:
    // https://stripe.com/docs/crypto/using-the-api
    await safeOnRamp.open({
      element: "#stripe-root",
      theme: "light",
      defaultOptions: {
        transaction_details: {
          wallet_address: address,
          lock_wallet_address: true,
          supported_destination_networks: ["polygon"],
        },
      },
      // Optional, if you want to use a specific created session
      // ---
      // sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC',
      // Optional, if you want to specify default options
      // ---
      // defaultOptions: {
      // transaction_details: {
      //   wallet_address: walletAddress,
      //   lock_wallet_address: true
      //   supported_destination_networks: ['ethereum', 'polygon'],
      //   supported_destination_currencies: ['usdc'],
      // },
      // customer_information: {
      //   email: 'john@doe.com'
      // }
    });

    setShowButton(false);

    // Subscribe to Stripe events
    safeOnRamp.subscribe("onramp_ui_loaded", () => {
      console.log("UI loaded");
    });

    safeOnRamp.subscribe("onramp_session_updated", (e) => {
      console.log("Session Updated", e.payload);
    });
  };

  return (
    <div
      id="stripe-root"
      className="mt-10 flex flex-col items-center gap-5 text-center"
    >
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Buy crypto and get started learning 🚀
      </h1>
      <p className="max-w-[440px] text-center">
        Don&apos;t have any crypto? No worries! You can buy crypto with your
        credit card and get started right away.
      </p>
      {showButton && <Button onClick={fundWallet}>Buy crypto</Button>}
    </div>
  );
};

export default SafePage;
