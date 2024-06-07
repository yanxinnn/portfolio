"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "./icons/ArrowUpIcon";

const ScrollToTopButton = () => {
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const targetDiv = document.getElementById("targetDiv");
      if (targetDiv) {
        const rect = targetDiv.getBoundingClientRect();
        const targetPosition = rect.top + window.scrollY;

        if (window.scrollY + window.innerHeight > targetPosition) {
          setIsFixed(false);
        } else {
          setIsFixed(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      id="scrollToTopButton"
      className={`iconCircleBackground flex justify-center items-center ${
        isFixed ? "fixed bottom-8 right-8" : "absolute right-8 -mt-20"
      }`}
      href="#"
    >
      <ArrowUpIcon />
    </a>
  );
};

export default ScrollToTopButton;
