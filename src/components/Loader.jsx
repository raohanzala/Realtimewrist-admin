import React from "react";

function Loader({ className = "", color = "#6366F1", size = "50px", ...rest }) {
  return (
    <div
      className={`w-full h-full flex justify-center items-center z-[9999] ${
        "backdrop-blur-sm bg-gray-800 bg-opacity-60 fixed inset-0"
      }`}
    >
      <div
        className={`relative ${className}`}
        style={{
          width: size,
          height: size,
        }}
        {...rest}
      >
        {/* Circular Trailing Dot Spinner */}
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-gray-300 rounded-full"
            style={{
              backgroundColor: color,
              animation: "spin-dots 1.2s linear infinite",
              animationDelay: `${index * 0.1}s`,
              transform: `rotate(${index * 30}deg) translate(${parseInt(size) / 2 - 8}px)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Loader;
