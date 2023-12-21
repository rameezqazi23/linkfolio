import Link from "next/link";

const Home = () => {
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
      
      <form className="inline-flex items-center mt-4 shadow-lg">
        <span className="bg-white py-4 pl-3 text-black">linkfolio.to/</span>
        <input
          className="py-4 outline-none text-slate-500"
          type="text"
          placeholder="username"
        />
        <button className="bg-blue-700 text-white w-32 py-4" type="submit">
          Join for free
        </button>
      </form>
    </main>
  );
};

export default Home;
