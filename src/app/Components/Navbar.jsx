import Link from "next/link";

const Navbar = () => {
  return (
    <main>
      <header className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 border-b border-b-[#e6ebf4] flex justify-between px-10 py-6">
        <div className="flex gap-10">
          <Link href={"/"}>LinkFolio</Link>
          <nav className="flex items-center gap-4 text-slate-500 text-sm">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>
        <div className="flex gap-4 text-sm text-slate-500">
          <Link href={"/signin"}>Sign in</Link>
          <Link href={"/signup"}>Create account</Link>
        </div>
      </header>
    </main>
  );
};

export default Navbar;
