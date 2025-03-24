import Contact from "./contact";

export default async function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r to-slate-500 from-slate-800 px-2 text-white h-10">
      <div className="items-center h-10 mx-10 flex justify-between ">
        <p className="text-sm">
          <span className="font-bold">©Luxury shop</span> - All Rights Reserved
        </p>
        <Contact />
      </div>
    </footer>
  );
}
