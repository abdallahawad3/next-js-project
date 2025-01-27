import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ThemeChanger";

const Header = () => {
  return (
    <div className="container flex items-center justify-between bg-gray-900 gap-1 py-4">
      <ModeToggle />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
