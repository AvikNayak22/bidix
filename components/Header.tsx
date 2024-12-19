import Image from "next/image";
import React from "react";
import { SignOut } from "./SignOut";
import SignIn from "./SignIn";
import { auth } from "@/auth";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <div className="bg-purple-200 py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="file.svg" alt="logo" width={50} height={50} />
            Bidix
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All auctions
            </Link>
            <Link
              href="/bid/create"
              className="hover:underline flex items-center gap-1"
            >
              Create Auction
            </Link>
            <Link
              href="/auctions"
              className="hover:underline flex items-center gap-1"
            >
              My auctions
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
