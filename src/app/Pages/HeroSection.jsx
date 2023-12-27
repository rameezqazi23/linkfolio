import Link from "next/link";
import HeroForm from "../Components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="pt-32">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold">
          Your One <span className="bg-green-400 px-3">Link</span> <br /> for
          Everything
        </h1>
        <h3 className="text-xl text-slate-500 pt-8">
          Clutter your links, social profiles, contact info and more in one page{" "}
          <br />
          <Link href={"/learn more"} className="text-blue-700 text-sm">
            learn more
          </Link>
        </h3>
      </div>
      <HeroForm user={session?.user} />
    </main>
  );
};

export default Home;
