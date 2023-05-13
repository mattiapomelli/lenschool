import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { Label } from "@components/basic/label";
import { TextArea } from "@components/basic/textarea";

interface CreateCommentFields {
  content: string;
}

export const CreateCommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentFields>();

  const onSubmit = handleSubmit(async (data) => {
    reset();
  });

  return (
    <div className="mt-4">
      <Label className="mb-1 text-base">Start new discussion</Label>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <TextArea
          block
          {...register("content", { required: "Content is required" })}
          error={errors.content?.message}
          className="flex-1"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            // loading={isLoading || uploadIsLoading}
            // disabled={isLoading || uploadIsLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
