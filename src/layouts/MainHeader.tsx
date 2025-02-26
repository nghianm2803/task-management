"use client";

import React from "react";
import Link from "next/link";
import Avatar from "../assets/avatar.png";
import Image from "next/image";
const MainHeader = () => {
  return (
    <div className="px-3 py-2 custom-shadow z-[10] bg-white dark:bg-slate-800">
      <div className="flex items-center justify-between h-full gap-2 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white dark:text-white">
            Task Management
          </p>
        </Link>
        <div className="flex align-middle float-right gap-2">
          <div className="relative inline-block text-left ">
            <button className="flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-800 dark:text-white">
              <Image
                src={Avatar}
                alt="Avatar"
                width={40}
                height={40}
                className="inline-block rounded-full ring-2 ring-white mr-3"
                priority
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
