import Footer from "@/components/store/layout/footer/footer";
import Header from "@/components/store/layout/header/header";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export default function StoreLayout({ children }: Props) {
  return (
    <div className="h-screen">
      <div className="min-h-[calc(100%-40px)]">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
      <Toaster position="top-center"></Toaster>
    </div>
  );
}
