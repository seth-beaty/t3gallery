import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import { RequestUploadPermissions } from "./request-upload-permissions";

export function TopNav() {
  return (
    <nav className="font-semibold: flex flex-wrap items-center justify-between p-4 text-xl">
      <div>Gallery</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <RequestUploadPermissions />
          <SimpleUploadButton />
          <UserButton></UserButton>
        </SignedIn>
      </div>
    </nav>
  );
}
