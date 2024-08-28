import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
    return (
      <nav className="flex items-center justify-between flex-wrap p-4 text-xl font-semibold:">
        <div>Gallery</div>
        <div>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton></UserButton>
        </SignedIn>
        </div>
    </nav>
);
}