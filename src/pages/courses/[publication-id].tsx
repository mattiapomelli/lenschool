import {
  ProfileOwnedByMeFragment,
  useActiveProfile,
  useCollect,
  useCreateMirror,
} from "@lens-protocol/react-web";
import { Contract, ethers } from "ethers";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { useAccount, erc20ABI } from "wagmi";

import { Button } from "@components/basic/button";
import { CopyButton } from "@components/basic/copy-button";
import { Spinner } from "@components/basic/spinner";
import { Tabs } from "@components/basic/tabs";
import { CourseForum } from "@components/course/course-forum";
import { CoursePlayer } from "@components/course/course-player";
import { CourseStudentsList } from "@components/course/course-students-list";
import { useCourse } from "@lib/courses/use-course";
import { getPictureURL } from "@utils/ipfs-to-gateway-url";

import type { CourseWithPublicationAndReferral } from "@lib/courses/types";

const CourseInfo = ({
  course,
}: {
  course: CourseWithPublicationAndReferral;
}) => {
  const { data: activeProfile } = useActiveProfile();
  const { execute: collect } = useCollect({
    collector: activeProfile as ProfileOwnedByMeFragment,
    publication: course.publication,
  });
  const { execute: mirror } = useCreateMirror({
    publisher: activeProfile as ProfileOwnedByMeFragment,
  });
  const { connector: activeConnector } = useAccount();

  const hasPurchasedCourse = course.publication.hasCollectedByMe;
  // @ts-ignore
  const referralMirrorId = course.publication.mirrors.findLast((mirror) =>
    mirror.includes(activeProfile?.id + "-"),
  );
  const referralLink = referralMirrorId
    ? "http://localhost:3000/courses/" + referralMirrorId
    : null;
  console.log("Referral: ", referralLink);

  const items = [
    {
      label: "Enrolled Students",
      content: <CourseStudentsList publicationId={course.publication.id} />,
    },
    {
      label: "Discussions",
      content: <CourseForum publicationId={course.publication.id} />,
    },
  ];

  const handleCollect = async (event: FormEvent) => {
    console.log("collecting post");
    event.preventDefault();

    console.log("approving");

    const address = "0x9c3c9283d3e44854697cd22d3faa240cfb032889"; // WMATIC

    if (activeConnector) {
      console.log(activeConnector);
      const signer = await activeConnector.getSigner();
      console.log(signer);
      const erc20 = new Contract(address, erc20ABI, signer);
      const tx = await erc20
        .connect(signer)
        .approve(
          course.publication.collectPolicy.contractAddress,
          ethers.constants.MaxUint256,
        );
      await tx.wait();
      console.log(tx);
    }

    collect().then(console.log).catch(console.log);
  };

  const handleReferral = async (event: FormEvent) => {
    console.log(course.publication);
    console.log("mirroring post");
    event.preventDefault();
    mirror({
      publication: course.publication,
    })
      .then(console.log)
      .catch(console.log);
  };

  return (
    <div>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1">
          <div className="rounded-box relative h-40 overflow-hidden">
            <Image
              src={course.metadata.imageUrl}
              layout="fill"
              objectFit="cover"
              alt="course"
              priority
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold">{course.metadata.title}</h1>
          <div className="flex items-center gap-2">
            <div className="relative mt-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={getPictureURL(course.publication)}
                layout="fill"
                objectFit="cover"
                alt="Profile"
                priority
              />
            </div>
            <Link
              href={`/user/${course.publication.profile.handle.replace(
                ".test",
                "",
              )}`}
            >
              <h4 className="mt-1 text-lg font-semibold hover:opacity-70">
                {course.publication.profile.handle}
              </h4>
            </Link>
          </div>
          <p className="mt-4">{course.metadata.description}</p>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 p-10">
          {hasPurchasedCourse ? (
            <div className="flex w-full flex-col items-center gap-4">
              <CoursePlayer course={course} className="w-full" />
              {/* {!course.isReferral && course.seller !== address && ( */}
              {!course.isReferral && (
                <>
                  <p className="max-w-[300px] text-center">
                    Share this course with your frens and earn a fee for every
                    purchase made
                  </p>
                  {referralLink ? (
                    <CopyButton
                      text={referralLink}
                      label="Copy referral link"
                    />
                  ) : (
                    <Button onClick={handleReferral} color="neutral" size="lg">
                      Refer course
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-center font-bold">
                {ethers.utils.formatEther(course.price)} wMATIC
              </span>
              <Button onClick={handleCollect} size="lg">
                Enroll now
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-14">
        <Tabs items={items} />
      </div>
    </div>
  );
};

const CoursePageInner = ({ publicationId }: { publicationId: string }) => {
  const { data: course, isLoading } = useCourse(publicationId);

  if (isLoading || !course) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return <CourseInfo course={course} />;
};

const CoursePage = () => {
  const router = useRouter();
  const publicationId = router.query["publication-id"]?.toString();

  if (!publicationId) return null;

  return <CoursePageInner publicationId={publicationId} />;
};

export default CoursePage;
