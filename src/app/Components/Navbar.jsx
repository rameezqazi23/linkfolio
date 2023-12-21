import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Navbar = async () => {
  const sessionData = await getServerSession(authOptions);
  console.log("Session data==>", sessionData);

  return (
    <main>
      <header className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 border-b border-b-[#e6ebf4] py-6">
        <div className="max-w-4xl mx-auto flex justify-between px-8">
          <div className="flex gap-10">
            <Link href={"/"}>LinkFolio</Link>
            <nav className="flex items-center gap-4 text-slate-500 text-sm">
              <Link className="hover:text-green-500 delay-200" href={"/about"}>
                About
              </Link>
              <Link
                className="hover:text-green-500 delay-200"
                href={"/pricing"}
              >
                Pricing
              </Link>
              <Link
                className="hover:text-green-500 delay-200"
                href={"/contact"}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex gap-4 text-sm text-slate-500">
            <Link className="hover:text-green-500 delay-200" href={"/login"}>
              Sign in
            </Link>
            <Link className="hover:text-green-500 delay-200" href={"/signup"}>
              Create account
            </Link>
          </div>
        </div>
      </header>
    </main>
  );
};

export default Navbar;
