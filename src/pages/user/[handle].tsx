import {
  useProfile,
  Profile,
  useActiveProfile,
} from "@lens-protocol/react-web";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { Tabs } from "@components/basic/tabs";
import { ProfileCreatedCourses } from "@components/profile/profile-created-courses";
import { ProfileEnrolledCourses } from "@components/profile/profile-enrolled-courses";
import { getDMLink } from "@utils/get-dm-link";
import { getPictureURL } from "@utils/ipfs-to-gateway-url";

const ProfileInfo = ({ profile }: { profile: Profile }) => {
  const { data: activeProfile } = useActiveProfile();
  const items = [
    {
      label: "Enrolled Courses",
      content: <ProfileEnrolledCourses profile={profile} />,
    },
    {
      label: "Created Courses",
      content: <ProfileCreatedCourses profile={profile} />,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="relative mt-2 h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src={getPictureURL(profile)}
            layout="fill"
            objectFit="cover"
            alt="Profile"
            priority
          />
        </div>
        <h1 className="mt-1 text-2xl font-semibold">{profile.handle}</h1>
        {activeProfile && (
          <a
            href={getDMLink(activeProfile, profile)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="ml-2">
              Connect
            </Button>
          </a>
        )}
      </div>
      <p className="mt-4">{profile.bio}</p>

      <div className="mt-14">
        <Tabs items={items} />
      </div>
    </div>
  );
};

const ProfilePageInner = ({ handle }: { handle: string }) => {
  const { data: profile, loading } = useProfile({
    // profileId: profileId(profId),
    handle: `${handle}.test`,
  });

  console.log("Profile", profile);

  if (loading || !profile) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return <ProfileInfo profile={profile} />;
};

const ProfilePage = () => {
  const router = useRouter();
  const handle = router.query.handle?.toString();

  if (!handle) return null;

  return <ProfilePageInner handle={handle} />;
};

export default ProfilePage;
