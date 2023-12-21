import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "./buttons/LogoutButton";
import { FaLink } from "react-icons/fa";

const Navbar = async () => {
  const sessionData = await getServerSession(authOptions);
  console.log("Session data==>", sessionData);

  return (
    <main>
      <header className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 border-b border-b-[#e6ebf4] py-6">
        <div className="max-w-4xl mx-auto flex justify-between px-8">
          <div className="flex gap-10">
            <Link className="flex items-center gap-2 text-2xl font-semibold" href={"/"}>
              <FaLink className="text-green-400" size={25} />
              <span className="bg-green-400 px-3">Link</span>Folio
            </Link>
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
            {sessionData ? (
              <>
                <Link
                  className="hover:text-green-500 delay-200"
                  href={"/account"}
                >
                  Hello, {sessionData?.user?.name}
                </Link>
                <LogoutButton />

                {/* <Image
                  src={sessionData.user?.image}
                  alt="profile"
                  width={800}
                  height={500}
                /> */}
              </>
            ) : (
              <>
                <Link
                  className="hover:text-green-500 delay-200"
                  href={"/login"}
                >
                  Sign in
                </Link>
                <Link
                  className="hover:text-green-500 delay-200"
                  href={"/signup"}
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </main>
  );
};

export default Navbar;
