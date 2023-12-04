import React from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function SubmitBtn() {
  return (
    <button
      type="submit"
      className="group active:scale-105  dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
    >
      <div className="submit_btn"></div>
      {/* {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )} */}
    </button>
  );
}
