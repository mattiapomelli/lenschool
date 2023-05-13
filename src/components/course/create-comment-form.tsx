import {
  CollectPolicyType,
  ContentFocus,
  ProfileOwnedByMe,
  publicationId,
  useActiveProfile,
  useApolloClient,
  useCreateComment,
} from "@lens-protocol/react-web";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Label } from "@components/basic/label";
import { TextArea } from "@components/basic/textarea";
import { upload } from "@utils/upload";

interface CreateCommentFields {
  content: string;
}

interface CreateCommentFormInnerProps {
  profile: ProfileOwnedByMe;
  pubId: string;
  onSuccess?: () => void;
}

export const CreateCommentFormInner = ({
  profile,
  pubId,
}: CreateCommentFormInnerProps) => {
  const client = useApolloClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentFields>();

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
      client.refetchQueries({
        include: ["publication"],
      });
    }
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <TextArea
        block
        {...register("content", { required: "Content is required" })}
        error={errors.content?.message}
        className="flex-1"
      />
      <div className="flex justify-end">
        <Button type="submit" loading={isPending} disabled={isPending}>
          Submit
        </Button>
      </div>
    </form>
  );
};

interface CreateCommentFormProps {
  pubId: string;
  onSuccess?: () => void;
}

export const CreateCommentForm = ({
  pubId,
  onSuccess,
}: CreateCommentFormProps) => {
  const { data: profile } = useActiveProfile();

  return (
    <div className="mt-4">
      <Label className="mb-1 text-base">Start new discussion</Label>
      {profile ? (
        <CreateCommentFormInner
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
