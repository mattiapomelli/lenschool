import Image from "next/image";
import Link from "next/link";

interface Profile {
  imageUrl: string;
  handle: string;
  description: string;
}

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileSmallCard = ({ profile }: ProfileCardProps) => {
  return (
    <Link
      href={`/profiles/${profile.handle}`}
      key={profile.handle}
      className="rounded-box flex w-full items-center gap-4 bg-base-200 px-3 py-2 hover:bg-base-300"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={profile.imageUrl}
          layout="fill"
          objectFit="cover"
          alt="Profile"
          priority
        />
      </div>

      <div className="flex flex-col">
        <h4 className="mt-1 font-semibold">{profile.handle}</h4>
        <p className="text-sm text-base-content/70">
          {profile.description.substring(0, 50).concat("...")}
        </p>
      </div>
    </Link>
  );
};
