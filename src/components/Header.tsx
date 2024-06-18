"use client";

import Link from "next/link";
import { CopyEmailButton } from "./CopyEmailButton";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";
import { useState } from "react";
import { HamburgerMenuIcon } from "./icons/HamburgerMenuIcon";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="self-stretch sticky top-0 z-10">
      <nav className="header justify-between sm:px-12">
        <Link
          href="/"
          className="font-bold text-2xl tracking-wider text-earthy-500"
        >
          YJ
        </Link>

        <div className="gap-10 text-lg font-medium hidden sm:flex">
          {/* Contact info */}
          <Link
            href="https://www.linkedin.com/in/yanxinn/"
            target="_blank"
            className="hover:text-lightAccent-300"
          >
            Linkedin
          </Link>

          <CopyEmailButton />

          <Link
            className="flex gap-2 hover:text-lightAccent-300"
            href="/images/YanxinJiang_Resume.pdf"
            target="blank"
          >
            Resume
            <ExternalLinkIcon />
          </Link>
        </div>

        <button className="sm:hidden p-0" onClick={() => setIsOpen(!isOpen)}>
          <HamburgerMenuIcon className="hover:text-lightAccent-300" />
        </button>
      </nav>

      {isOpen && (
        <div className="relative sm:hidden">
          <div className="absolute top-0 right-8 flex flex-col gap-4 text-lg font-medium p-6 bg-white w-60 rounded-lg shadow-md">
            <Link
              href="https://www.linkedin.com/in/yanxinn/"
              target="_blank"
              className="hover:text-lightAccent-300"
            >
              Linkedin
            </Link>

            <CopyEmailButton />

            <Link
              className="flex gap-2 hover:text-lightAccent-300"
              href="/images/YanxinJiang_Resume.pdf"
              target="blank"
            >
              Resume
              <ExternalLinkIcon />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
