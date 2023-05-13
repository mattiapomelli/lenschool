import { useActiveProfile } from "@lens-protocol/react-web";
import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import Image from "next/image";
import React from "react";
import { useQuery } from "wagmi";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { CreateCourseForm } from "@components/course/create-course-form";
import { LensLogin } from "@components/layout/lens-login";
import { env } from "env.mjs";

import type { ISuccessResult } from "@worldcoin/idkit";
import type { NextPage } from "next";

const CreateCoursePageInner = () => {
  const { data: profile, loading: profileLoading } = useActiveProfile();

  const {
    data: isVerified,
    isLoading: verifiedLoading,
    refetch: refetchIsVerified,
  } = useQuery<boolean>(["is-verified", profile?.ownedBy], async () => {
    const res = await fetch(`/api/is-verified?address=${profile?.ownedBy}`);
    const data = await res.json();
    return data.verified;
  });

  const onSuccess = (result: ISuccessResult) => {
    console.log("Result ", result);
    refetchIsVerified();
  };

  const handleProof = async (result: ISuccessResult) => {
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      credential_type: result.credential_type,
      action: env.NEXT_PUBLIC_WLD_ACTION_NAME,
      signal: "",
      userAddress: profile?.ownedBy,
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

  if (profileLoading || verifiedLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  console.log("Profile: ", profile);

  if (!profile) {
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>Sign in with Lens to create a course</p>
        <LensLogin />
      </div>
    );
  }

  console.log("Is verified: ", isVerified);

  if (!isVerified) {
    return (
      <div className="my-14 flex flex-col items-center gap-5">
        <p className="max-w-[400px] text-center">
          Prove that you&apos;re an human to start teaching. No bots 🤖 or
          aliens 👽 allowed.
        </p>
        <IDKitWidget
          action={env.NEXT_PUBLIC_WLD_ACTION_NAME}
          onSuccess={onSuccess}
          handleVerify={handleProof}
          app_id={env.NEXT_PUBLIC_WLD_APP_ID}
          credential_types={[CredentialType.Orb, CredentialType.Phone]}
        >
          {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
        </IDKitWidget>
        <div className="mt-2">
          <p className="mb-1 text-center text-sm">Powered by</p>
          <div className="flex items-center gap-2">
            <Image
              src="/worldcoin-logo.svg"
              height={24}
              width={141}
              alt="Worldcoin"
            />
            <span>❤️</span>
          </div>
        </div>
      </div>
    );
  }

  return <CreateCourseForm />;
};

const CreateCoursePage: NextPage = () => {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Teach what you know 💎
      </h1>
      <h4 className="mb-4 mt-2 text-xl font-bold">New course</h4>
      <CreateCoursePageInner />
    </div>
  );
};
export default CreateCoursePage;
