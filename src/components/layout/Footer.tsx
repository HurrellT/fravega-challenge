import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full flex gap-6 flex-wrap items-center justify-center p-4 border-t dark:border-grey-500 light:border-grey-200">
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
  );
}

export default Footer;
