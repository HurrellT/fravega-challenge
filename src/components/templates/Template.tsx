import Image from "next/image";
import { useRouter } from "next/router";
import { ThemeToggle } from "../theme-toggle";

function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      {/* TODO: Extract header and footer to a component */}
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
      <main className="flex flex-col gap-8 items-center justify-center w-full py-8">
        {children}
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://fravega.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Fravega Tech Challenge
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://hurrellt.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Tomás Hurrell 2025
        </a>
      </footer>
    </>
  );
}

export default Template;
