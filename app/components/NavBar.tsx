"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          width={80}
          height={80}
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="Logo"
          className="object-contain"
        />
      </div>

      <ul className="flex items-center gap-6">
        <li>
          <Link href="/" className="hover:text-indigo-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/jobs" className="hover:text-indigo-400">
            Jobs
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-500 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
