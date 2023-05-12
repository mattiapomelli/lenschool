import Image from "next/legacy/image";

import { Button } from "@components/basic/button";

interface Profile {
  imageUrl: string;
  handle: string;
  description: string;
}

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="rounded-box flex flex-col items-center gap-4 bg-base-200 px-4 py-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
        <Image
          src={profile.imageUrl}
          layout="fill"
          objectFit="cover"
          alt="Profile"
          priority
        />
      </div>

      <h4 className="mt-1 font-semibold">{profile.handle}</h4>
      <p className="text-center text-sm text-base-content/70">
        {profile.description}
      </p>

      <div className="flex gap-2">
        <Button color="neutral">See profile</Button>
        <Button>Connect</Button>
      </div>
    </div>
  );
};
