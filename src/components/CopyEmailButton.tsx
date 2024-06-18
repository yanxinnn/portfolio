"use client";
import { useState } from "react";

export function CopyEmailButton() {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleButtonClick = () => {
    navigator.clipboard.writeText("yanxinjiang@live.com");
    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <div>
      <button
        className="p-0 hover:text-lightAccent-300"
        onClick={handleButtonClick}
      >
        Email
      </button>

      {alertVisible && (
        <div className="fixed top-6 left-0 right-0">
          <div className="z-10 w-fit mx-auto font-body text-white bg-neutral-600 py-2 px-6 rounded text-base">
            Email copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
}
