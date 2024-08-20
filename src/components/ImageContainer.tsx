"use client";
import React, { useState, useEffect } from "react";

type ImageContainerProps = {
  images: string[];
  description?: string;
  bordered?: boolean;
  className?: string;
};

export function ImageContainer(props: ImageContainerProps) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  // Handling scrolling for fullscreened images
  useEffect(() => {
    if (fullscreenImage) {
      // Scrolling disabled when fullscreened
      document.body.classList.add("disableScroll");
    } else {
      // Scrolling enabled when image closed
      document.body.classList.remove("disableScroll");
    }
    return () => {
      document.body.classList.remove("disableScroll");
    };
  }, [fullscreenImage]);

  return (
    <div className="flex flex-col gap-4 items-center pt-2 pb-6">
      <div className="self-stretch grid grid-flow-row sm:grid-flow-col gap-8 sm:gap-4 place-content-center">
        {/* Images */}
        {props.images.map((image) => (
          <div
            key={image}
            className={`cursor-pointer ${props.className || ""}`}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image}
              className={
                props.bordered ? "rounded-lg border border-[#D9DDE1]" : ""
              }
              alt={props.description}
            />
          </div>
        ))}
      </div>

      {/* Description */}
      {props.description && (
        <p className="font-body italic text-sm font-medium text-stone-400 text-center">
          {props.description}
        </p>
      )}

      {/* Fullscreen Image */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-85 p-6 sm:p-14"
          onClick={closeFullscreen}
        >
          <img
            src={fullscreenImage}
            className={`max-w-full max-h-full ${
              props.bordered ? "rounded-lg" : ""
            }`}
          />
        </div>
      )}
    </div>
  );
}
