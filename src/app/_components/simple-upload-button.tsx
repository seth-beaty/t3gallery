"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import {
  ErrorSVG,
  LoadingSpinnerSVG,
  SucessSVG,
  UploadSVG,
} from "./toast-svgs";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function SimpleUploadButton() {
  const router = useRouter();

  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("upload-begin");
      toast(
        <div className="flex items-center gap-2">
          <LoadingSpinnerSVG />
          <span className="text-lg">Uploading...</span>
        </div>,
        {
          id: "upload-begin",
        },
      );
    },
    onUploadError(error) {
      posthog.capture("upload error", { error });
      toast.dismiss("upload-begin");
      toast(
        <div className="flex items-center gap-2">
          <ErrorSVG />
          <span className="text-lg">Error: {error.message}</span>
        </div>,
      );
    },

    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast(
        <div className="flex items-center gap-2">
          <SucessSVG />
          <span className="text-lg">Upload complete!</span>
        </div>,
      );
      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
