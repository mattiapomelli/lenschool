import {
  CollectPolicyType,
  ContentFocus,
  ProfileOwnedByMe,
  publicationId,
  useActiveProfile,
  useCreateComment,
} from "@lens-protocol/react-web";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { upload } from "@utils/upload";

interface ReplyCommentFields {
  content: string;
}

interface ReplyCommentFormInnerProps {
  profile: ProfileOwnedByMe;
  pubId: string;
  onSuccess?: () => void;
}

export const ReplyCommentFormInner = ({
  profile,
  pubId,
}: ReplyCommentFormInnerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplyCommentFields>();

  const { execute: createComment, isPending } = useCreateComment({
    publisher: profile,
    upload: upload,
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await createComment({
      publicationId: publicationId(pubId),
      locale: "en",
      contentFocus: ContentFocus.TEXT,
      content: data.content,
      collect: {
        type: CollectPolicyType.NO_COLLECT,
      },
    });

    if (result.isSuccess()) {
      reset();
    }
  });

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <Input
        {...register("content", { required: "Content is required" })}
        error={errors.content?.message}
        className="flex-1"
      />
      <div className="flex justify-end">
        <Button type="submit" loading={isPending} disabled={isPending}>
          Reply
        </Button>
      </div>
    </form>
  );
};

interface ReplyCommentFormProps {
  pubId: string;
  onSuccess?: () => void;
}

export const ReplyCommentForm = ({
  pubId,
  onSuccess,
}: ReplyCommentFormProps) => {
  const { data: profile } = useActiveProfile();

  return (
    <div className="mt-1">
      {profile ? (
        <ReplyCommentFormInner
          pubId={pubId}
          profile={profile}
          onSuccess={onSuccess}
        />
      ) : (
        <div className="my-14 flex justify-center">
          <p>Sign in with Lens to start a new discussion</p>
        </div>
      )}
    </div>
  );
};
