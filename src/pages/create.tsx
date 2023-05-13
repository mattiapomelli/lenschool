import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { Spinner } from "@components/basic/spinner";
import { TextArea } from "@components/basic/textarea/textarea";
import { FileDropzone } from "@components/file-dropzone";
import { WalletStatus } from "@components/wallet/wallet-status";
import { useUploadVideo } from "@hooks/use-upload-video";
import { useCreateCourse } from "@lib/courses/use-create-course";

import type { Asset } from "@livepeer/react";
import type { NextPage } from "next";

interface CreateCourseFields {
  title: string;
  price: string;
  referral: string;
  description: string;
  keywords: string;
}

const CreateCourseForm = () => {
  const [asset, setAsset] = useState<Asset | undefined>();

  const router = useRouter();

  const [image, setImage] = useState<File | undefined>();
  const [video, setVideo] = useState<File | undefined>();

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutateAsync: uploadVideo,
    error,
    progressFormatted,
    isLoading: uploadIsLoading,
  } = useUploadVideo(video, {
    onSuccess: setAsset,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCourseFields>();

  const { mutate: createCourse, isLoading } = useCreateCourse({
    onSuccess(receipt) {
      reset();
      if (!receipt) return;
      // const id = receipt.events?.find((e) => e.event === "CourseCreated")?.args
      //   ?.courseId;

      router.push(`/`);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    // if (!asset) {
    //   await uploadVideo();
    // } else {
    // if (!asset.playbackId || !image) return;
    // if (!asset.playbackId || !image) return;
    const { title, description, price, referral, keywords } = data;

    createCourse({
      title,
      description,
      price: ethers.utils.parseEther(price),
      referral: Number(referral),
      // image,
      image: new File([], ""),
      // videoPlaybackId: asset.plsaybackId,
      videoPlaybackId: "1806vd0wgt1rmgmo",
      keywords: keywords.split(",").map((value) => value.trim()),
    });
    // }
  });

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input
          label="Title"
          block
          defaultValue="title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />
        <Input
          label="Price (MATIC)"
          type="number"
          step="0.0000001"
          block
          defaultValue="0.0001"
          {...register("price", { required: "Price is required" })}
          error={errors.price?.message}
        />
        <Input
          label="Referral fee (%)"
          type="number"
          block
          defaultValue="1"
          {...register("referral", { required: "Referral fee is required" })}
          error={errors.referral?.message}
        />
        <Input
          label="Categories (sep. by comma)"
          block
          defaultValue="category1, category2"
          {...register("keywords", { required: "Category is required" })}
          error={errors.keywords?.message}
        />
        <TextArea
          label="Description"
          rows={3}
          defaultValue="description"
          {...register("description", {
            required: "Description is required",
          })}
          error={errors.description?.message}
        />
        <FileDropzone
          value={image}
          onValueChange={setImage}
          accept={{
            "image/*": [".jpeg", ".png"],
          }}
          label="Cover Image"
        />

        {asset ? (
          <div className="rounded-box border-success bg-success/50 px-4 py-3">
            Video uploaded ✅
          </div>
        ) : (
          <FileDropzone
            value={video}
            onValueChange={setVideo}
            accept={{
              "video/*": ["*.mp4"],
            }}
            label="Video lecture"
          />
        )}

        <Button
          className="mt-2"
          block
          type="submit"
          loading={isLoading || uploadIsLoading}
          disabled={isLoading || uploadIsLoading}
        >
          {asset ? "Publish course" : "Upload video"}
        </Button>
        {!asset && (
          <div className="mt-2">
            {error?.message && <p className="text-error">{error.message}</p>}
            {progressFormatted && <span>{progressFormatted}</span>}
          </div>
        )}
      </form>
    </>
  );
};

const CreateCoursePage: NextPage = () => {
  const { address, isConnecting, isReconnecting } = useAccount();

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Teach what you know 💎
      </h1>
      <h4 className="mb-4 mt-2 text-xl font-bold">New course</h4>
      {isConnecting || isReconnecting ? (
        <div className="my-14 flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {address ? (
            <CreateCourseForm />
          ) : (
            <div className="my-14 flex flex-col items-center gap-3">
              <p>Connect your wallet to create a course</p>
              <WalletStatus />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreateCoursePage;
