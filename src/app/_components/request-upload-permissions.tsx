import { auth, clerkClient } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { UploadPermissionsButton } from "./upload-permissions-button";

export async function RequestUploadPermissions() {
  const user = auth();

  if (!user.userId) throw new UploadThingError("Unauthorized");

  const fullUserData = await clerkClient().users.getUser(user.userId);

  if (
    JSON.stringify(fullUserData?.privateMetadata?.["can-upload"]) === "true"
  ) {
    return <UploadPermissionsButton />;
  }
}
