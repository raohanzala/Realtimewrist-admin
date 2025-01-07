import React from "react";
import { CgSpinner } from "react-icons/cg";
import { ImSpinner, ImSpinner9 } from "react-icons/im";
import { LiaSpinnerSolid } from "react-icons/lia";

function Loader() {
  return (
    <div
      className={`w-full h-full flex justify-center items-center z-[9999] ${
        "backdrop-blur-sm bg-black bg-opacity-60 fixed inset-0"
      }`}
    >
      <div>
      <CgSpinner   className="animate-spin text-primary-1" size={60}  />

      </div>
        
    </div>
  );
}

export default Loader;
