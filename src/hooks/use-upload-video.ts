import { useCreateAsset } from "@livepeer/react";
import { useEffect, useMemo } from "react";

import { env } from "env.mjs";

import type { Asset } from "@livepeer/react";

interface UseUploadVideoOptions {
  onSuccess?: (asset: Asset) => void;
}

export const useUploadVideo = (
  video: File | undefined,
  options?: UseUploadVideoOptions,
) => {
  const {
    data: asset,
    status,
    progress,
    ...mutation
  } = useCreateAsset(
    video
      ? {
          sources: [
            {
              name: video.name,
              file: video,
              playbackPolicy: {
                type: "webhook",
                // This is the id of the webhook you created in step 2
                webhookId: env.NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID || "",
                webhookContext: {
                  // This is the context you want to pass to your webhook
                  // It can be anything you want, and it will be passed back to your webhook
                },
              },
            },
          ] as const,
        }
      : null,
  );

  useEffect(() => {
    if (asset?.[0]?.status?.phase === "ready") {
      options?.onSuccess?.(asset[0]);
    }
  }, [asset, options]);

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (asset?.[0] && asset[0].status?.phase !== "ready"),
    [status, asset],
  );

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? "Failed to process video."
        : progress?.[0].phase === "waiting"
        ? "Waiting..."
        : progress?.[0].phase === "uploading"
        ? `Uploading: ${Math.round(progress[0].progress * 100)}%`
        : progress?.[0].phase === "processing"
        ? `Processing: ${Math.round(progress[0].progress * 100)}%`
        : null,
    [progress],
  );

  return {
    ...mutation,
    isLoading,
    data: asset,
    status,
    progress,
    progressFormatted,
  };
};
