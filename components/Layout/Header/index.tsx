import Link from "next/link";

export const Header = () => {
  return (
    <header className="">
      <a href="#">SPlASH PAPER</a>

      <nav>
        <Link href="#">Home</Link>
        <Link href="#">About</Link>
        <Link href="#">How To Use ?</Link>
      </nav>
    </header>
  );
};
