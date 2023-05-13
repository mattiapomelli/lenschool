import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { TextArea } from "@components/basic/textarea/textarea";
import { FileDropzone } from "@components/file-dropzone";
import { useUploadVideo } from "@hooks/use-upload-video";
import { useCreateCourse } from "@lib/courses/use-create-course";

import type { Asset } from "@livepeer/react";

interface CreateCourseFields {
  title: string;
  price: string;
  referral: string;
  description: string;
  keywords: string;
}

export const CreateCourseForm = () => {
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
    if (!asset) {
      await uploadVideo();
    } else {
      if (!asset.playbackId || !image) return;
      const { title, description, price, referral, keywords } = data;

      createCourse({
        title,
        description,
        price: ethers.utils.parseEther(price),
        referral: Number(referral),
        image,
        // image: new File([], ""),
        videoPlaybackId: asset.playbackId,
        // videoPlaybackId: "1806vd0wgt1rmgmo",
        keywords: keywords.split(",").map((value) => value.trim()),
      });
    }
  });

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input
          label="Title"
          block
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />
        <Input
          label="Price (MATIC)"
          type="number"
          step="0.0000001"
          block
          {...register("price", { required: "Price is required" })}
          error={errors.price?.message}
        />
        <Input
          label="Referral fee (%)"
          type="number"
          block
          {...register("referral", { required: "Referral fee is required" })}
          error={errors.referral?.message}
        />
        <Input
          label="Categories (sep. by comma)"
          block
          {...register("keywords", { required: "Category is required" })}
          error={errors.keywords?.message}
        />
        <TextArea
          label="Description"
          rows={3}
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
              "video/*": [".mp4"],
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
