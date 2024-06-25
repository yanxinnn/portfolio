"use client";

import Link from "next/link";
import { CopyEmailButton } from "./CopyEmailButton";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";
import { useState, useEffect } from "react";
import { HamburgerMenuIcon } from "./icons/HamburgerMenuIcon";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="self-stretch sticky top-0 z-10">
      <nav className="header justify-between">
        <Link href="/" className="logo text-earthy-500">
          YJ
        </Link>

        <div
          className={`gap-10 text-lg font-medium hidden sm:flex ${
            isScrolled
              ? "bg-white/50 backdrop-blur-md shadow-md rounded-full absolute top-3 right-2 md:right-6 px-6 py-3"
              : ""
          }`}
        >
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

        <button
          className={`sm:hidden p-0 ${
            isScrolled
              ? "bg-white/40 backdrop-blur-md shadow-md rounded-full absolute top-2 right-1 p-3"
              : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <HamburgerMenuIcon className="hover:text-lightAccent-300" />
        </button>
      </nav>

      {isOpen && (
        <div className="relative sm:hidden">
          <div className="absolute top-0 right-4 flex flex-col gap-4 text-lg font-medium p-6 bg-white w-56 border border-neutral-200 rounded-lg shadow-md">
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
