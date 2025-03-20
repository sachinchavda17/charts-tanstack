import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between w-full border-b pb-2  ">
      <div className="text-xl">Charts</div>
      <div className="flex gap-5 items-center">
        <Link href={"/"} className="hover:border-b pb-1 hover:border-gray-500">
          Home
        </Link>
        <Link
          href={"/pie"}
          className="hover:border-b pb-1 hover:border-gray-500"
        >
          Pie
        </Link>
        <Link
          href={"/topology"}
          className="hover:border-b pb-1 hover:border-gray-500"
        >
          Topology
        </Link>
        <Link
          href={"/graph"}
          className="hover:border-b pb-1 hover:border-gray-500"
        >
         Force Graph
        </Link>
        <Link
          href={"/tanstack"}
          className="hover:border-b pb-1 hover:border-gray-500"
        >
         TanStack
        </Link>
      </div>
      <ModeToggle />
    </header>
  );
}
