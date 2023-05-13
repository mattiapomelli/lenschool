import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import { useAccount, useQuery } from "wagmi";

import { Spinner } from "@components/basic/spinner";
import { env } from "env.mjs";

import type { ISuccessResult } from "@worldcoin/idkit";

export default function Home() {
  const { address } = useAccount();

  const { data: isVerified, isLoading } = useQuery<boolean>(
    ["is-verified", address],
    async () => {
      const res = await fetch(`/api/is-verified?address=${address}`);
      const data = await res.json();
      return data.verified;
    },
  );

  const onSuccess = (result: ISuccessResult) => {
    console.log("Result ", result);
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
  };

  const handleProof = async (result: ISuccessResult) => {
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      credential_type: result.credential_type,
      action: env.NEXT_PUBLIC_WLD_ACTION_NAME,
      signal: "",
      userAddress: address,
    };
    fetch("/api/verify-worldcoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).then(async (res: Response) => {
      if (res.status == 200) {
        console.log("Successfully verified credential.");
      } else {
        throw (
          new Error("Error: " + (await res.json()).code) ?? "Unknown error."
        );
      }
    });
  };

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isVerified) {
    return <div>Verified</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <IDKitWidget
          action={env.NEXT_PUBLIC_WLD_ACTION_NAME}
          onSuccess={onSuccess}
          handleVerify={handleProof}
          app_id={env.NEXT_PUBLIC_WLD_APP_ID}
          credential_types={[CredentialType.Orb, CredentialType.Phone]}
        >
          {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>
      </div>
    </div>
  );
}
