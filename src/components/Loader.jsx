import React, { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(
    "Preparing your shopping experience"
  );

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prevProgress) => {
          const increment = Math.floor(Math.random() * 10) + 1;
          return Math.min(prevProgress + increment, 100);
        });
      }
    }, 300);

    // Cycle through loading messages
    const textTimer = setTimeout(() => {
      const messages = [
        "Preparing your shopping experience",
        "Loading product catalog",
        "Setting up your cart",
        "Checking for the best deals",
        "Almost ready!",
      ];
      const currentIndex = messages.indexOf(loadingText);
      const nextIndex = (currentIndex + 1) % messages.length;
      setLoadingText(messages[nextIndex]);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
    };
  }, [progress, loadingText]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>

            {/* Animated circle around logo */}
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>

            {/* Pulse effect */}
            <div className="absolute inset-0 -m-4 bg-indigo-400 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2 tracking-tight">
            Shop<span className="text-blue-500">Ease</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Simplify your shopping experience
          </p>
        </div>

        {/* Loading status text */}
        <div className="mb-4 text-center">
          <p className="text-gray-600">{loadingText}...</p>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading animation - cart with items */}
        <div className="flex justify-center mb-8 relative">
          {/* Cart */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {/* Items falling into cart animation */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <div className="relative w-24 h-24">
                {/* Item 1 */}
                <div
                  className="absolute w-3 h-3 bg-blue-500 rounded-sm animate-bounce"
                  style={{ animationDelay: "0s", left: "6px" }}
                ></div>

                {/* Item 2 */}
                <div
                  className="absolute w-3 h-3 bg-indigo-600 rounded-sm animate-bounce"
                  style={{ animationDelay: "0.4s", left: "14px" }}
                ></div>

                {/* Item 3 */}
                <div
                  className="absolute w-3 h-3 bg-purple-500 rounded-sm animate-bounce"
                  style={{ animationDelay: "0.8s", left: "10px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress percentage */}
        <div className="text-center">
          <span className="text-lg font-semibold text-indigo-800">
            {progress}%
          </span>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className="w-full h-full rounded-full bg-indigo-400/20 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
