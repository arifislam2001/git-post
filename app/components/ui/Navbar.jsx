// components/Navbar.jsx

import Link from "next/link";
import { FaPenSquare } from "react-icons/fa";


export default function Navbar() {
  return (
    <nav className="bg-white mt-4  text-black shadow-xl border-white px-8 py-4 flex items-center justify-around">
      
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2">
        <FaPenSquare className="text-blue-600 w-7 h-7" />

        <h1 className="text-2xl font-bold text-cyan-400">
          Postify
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          href="/CreatePost"
          className="hover:text-cyan-400 transition duration-300"
        >
          Create Post
        </Link>
        <Link
          href="/"
          className="hover:text-cyan-400 transition duration-300"
        >
          Home
        </Link>

        <Link
          href="/login"
          className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}