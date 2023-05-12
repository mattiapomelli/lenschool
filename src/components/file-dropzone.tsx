import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { useHasMounted } from "@hooks/use-has-mounted";

import { Label } from "./basic/label";

import type { Accept } from "react-dropzone";

interface FileDropzoneProps {
  value: File | undefined;
  onValueChange: (video: File | undefined) => void;
  accept?: Accept;
  label?: string;
}

export const FileDropzone = ({
  value,
  onValueChange,
  accept,
  label,
}: FileDropzoneProps) => {
  const hasMounted = useHasMounted();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && acceptedFiles[0]) {
        onValueChange(acceptedFiles[0]);
      }
    },
    [onValueChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles: 1,
    onDrop,
  });

  return (
    <div>
      {label && <Label>{label}</Label>}
      {hasMounted && (
        <div
          {...getRootProps()}
          className="rounded-box cursor-pointer border border-dashed border-base-content/20 bg-base-200 p-5"
        >
          <input {...getInputProps()} />
          <p>Drag and drop or browse files</p>
        </div>
      )}
      {value && (
        <p className="mt-2">
          <span className="font-medium">Selected:</span> {value.name}
        </p>
      )}
    </div>
  );
};
