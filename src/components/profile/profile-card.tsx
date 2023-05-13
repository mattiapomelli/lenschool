import { Wallet } from "@lens-protocol/react-web";
import Image from "next/legacy/image";

import { Button } from "@components/basic/button";
import { getPictureURL } from "@utils/ipfs-to-gateway-url";

interface ProfileCardProps {
  profile: Wallet;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const { defaultProfile } = profile;
  return (
    <div className="rounded-box flex flex-col items-center gap-4 bg-base-200 px-4 py-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image
          src={getPictureURL(defaultProfile)}
          layout="fill"
          objectFit="cover"
          alt="Profile"
          priority
        />
      </div>

      <h4 className="mt-1 font-semibold">{defaultProfile?.handle}</h4>
      <p className="text-center text-sm text-base-content/70">
        {defaultProfile?.bio}
      </p>

      <div className="flex gap-2">
        <Button color="neutral">See profile</Button>
        <Button>Connect</Button>
      </div>
    </div>
  );
};
