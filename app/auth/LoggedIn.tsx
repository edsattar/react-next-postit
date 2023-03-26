"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { DefaultSession } from "next-auth";

// create a function that returns a React component that renders the user's name and profile image if they are logged in and a button to sign out. The function takes the session.user object


export default function LoggedIn( user : DefaultSession["user"]) {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-xl">
        Sign Out
      </button>
        <h1>{user?.name}</h1>
      <Link href="/dashboard">
        <Image
          className="w-14 rounded-full"
          width={64}
          height={64}
          src={user?.image || "https://i.pravatar.cc"}
          alt=""
          priority
        />
      </Link>
    </li>
  );
}
