import Footer from "@/components/store/layout/footer/footer";
import Header from "@/components/store/layout/header/header";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export default function StoreLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <div className="h-[calc(100%-40px)]">
        <Header />
        <main className="bg-slate-50">
          <div className="max-w-[1650px] mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
      <Toaster position="top-center"></Toaster>
    </div>
  );
}
