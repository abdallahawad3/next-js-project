import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ThemeChanger";

const Header = () => {
  return (
    <div className="container flex items-center justify-between bg-slate-300 dark:bg-gray-900 dark:text-white gap-1 mb-10 py-4">
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
