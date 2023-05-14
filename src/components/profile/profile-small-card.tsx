import { Profile } from "@lens-protocol/react-web";
import Image from "next/legacy/image";
import Link from "next/link";

import { getPictureURL } from "@utils/ipfs-to-gateway-url";

interface ProfileSmallCardProps {
  profile: Profile;
}

export const ProfileSmallCard = ({ profile }: ProfileSmallCardProps) => {
  return (
    <Link
      href={`/user/${profile.handle.replace(".test", "")}`}
      className="rounded-box flex w-full items-center gap-4 bg-base-200 px-3 py-2 hover:bg-base-300"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={getPictureURL(profile)}
          layout="fill"
          objectFit="cover"
          alt="Profile"
          priority
        />
      </div>

      <div className="flex flex-col">
        <h4 className="mt-1 font-semibold">{profile.handle}</h4>
        <p className="text-sm text-base-content/70">
          {profile.bio?.substring(0, 30).concat("...")}
        </p>
      </div>
    </Link>
  );
};
