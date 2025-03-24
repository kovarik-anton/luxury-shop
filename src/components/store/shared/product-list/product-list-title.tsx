import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  title?: string;
  link?: string;
  arrow?: boolean;
}

export default function Title({ title, link, arrow }: Props) {
  if (link) {
    return (
      <Link href={link} className="h-12">
        <h3 className="text-main-primary text-xl font-bold">
          {title}&nbsp;
          {arrow && <ChevronRight className="w-3 inline-block" />}
        </h3>
      </Link>
    );
  } else {
    return (
      <h3 className="text-main-primary text-xl font-bold">
        {title}&nbsp;
        {arrow && <ChevronRight className="w-3 inline-block" />}
      </h3>
    );
  }
}
