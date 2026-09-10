"use client";
import posthog from "posthog-js";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export function UploadPermissionsButton() {
  return (
    <div>
      <Button
        variant={"link"}
        className="text-lg"
        onClick={() => {
          posthog.capture("request-upload-permissions");
          toast(<span className="text-lg">Upload Permission Requested</span>);
        }}
      >
        Request Upload Permissions
      </Button>
    </div>
  );
}
