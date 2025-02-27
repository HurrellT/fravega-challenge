import { useRouter } from "next/router";
import { ThemeToggle } from "../ThemeToggle";

function Header() {
  const router = useRouter();
  
  return (
    <header className="flex items-center justify-between w-full px-4 h-16 border-b dark:border-grey-500 light:border-grey-200">
      <div className="flex items-center gap-4">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          GitHub Users
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}

export default Header;
