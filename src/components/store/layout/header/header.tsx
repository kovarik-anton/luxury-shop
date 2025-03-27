import Link from "next/link";
import Search from "./search/search";
import Navigation from "./navigation";

export default function Header() {
  return (
    <section className="bg-gradient-to-r from-slate-500 to-slate-800">
      <div className="h-full w-full lg:flex text-white px-4 lg:px-12">
        <div className="flex lg:w-full lg:flex-1 flex-col lg:flex-row gap-3 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <p className="font-extrabold text-3xl font-mono">LuxuryShop</p>
            </Link>
            <div className="flex lg:hidden mr-3">
              <Navigation />
            </div>
          </div>
          <Search />
        </div>
        <div className="hidden lg:flex w-full lg:w-fit lg:mt-2 justify-end pl-6 items-center">
          <Navigation />
        </div>
      </div>
    </section>
  );
}
