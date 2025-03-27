import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <ul className="flex flex-row">
        <li className="ml-6">
          <Link href="blogs">Blogs</Link>
        </li>
        <li className="ml-6">
          <Link href="shops">Shops</Link>
        </li>
        <li className="ml-6">
          <Link href="contact-us">Contact us</Link>
        </li>
      </ul>
    </nav>
  );
}
