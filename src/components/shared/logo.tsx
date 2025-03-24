import Image from "next/image";
import LogoImg from "../../../public/assets/icons/luxuryshop.png";

interface Props {
  width: string;
  height: string;
}

export default function Logo({ width, height }: Props) {
  return (
    <div className="z-50" style={{ width, height }}>
      <Image
        src={LogoImg}
        alt="Luxury shop"
        className="w-full h-full object-cover overflow-visible"
      ></Image>
    </div>
  );
}
