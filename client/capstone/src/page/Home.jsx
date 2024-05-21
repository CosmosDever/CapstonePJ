import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import { Route, Routes } from "react-router-dom";
import { Tabs, Placeholder } from "rsuite";
import "rsuite/dist/rsuite.min.css";
export default function Home() {
  useEffect(() => {
    async function checkToken() {
      await axiosInstance.get("/checkToken").then((response) => {
        console.log(response.data);
        if (response.data.message !== "have token") {
          window.location.href = "/";
        }
      });
    }
    checkToken();
  });
  return (
    <main className="bg-gradient-to-br from-[#776212] from-0% via-[#171A1E] via-40% to-[#100F4A] to-99% w-screen h-screen flex  items-center justify-between ">
      <div className="h-full text-white bg-black bg-opacity-10  w-1/5 flex flex-col  items-center justify-center gap-5">
        <button className="text-3xl flex items-center justify-center bg-white bg-opacity-10 rounded-full w-full gap-2 ">
          <span>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 3L14 9L10 5L3 11M4.5 21C3.67157 21 3 20.3284 3 19.5V17.5C3 16.6716 3.67157 16 4.5 16C5.32843 16 6 16.6716 6 17.5V19.5C6 20.3284 5.32843 21 4.5 21ZM11.5 21C10.6716 21 10 20.3284 10 19.5V14.5C10 13.6716 10.6716 13 11.5 13C12.3284 13 13 13.6716 13 14.5V19.5C13 20.3284 12.3284 21 11.5 21ZM18.5 21C17.6716 21 17 20.3284 17 19.5V16.5C17 15.6716 17.6716 15 18.5 15C19.3284 15 20 15.6716 20 16.5V19.5C20 20.3284 19.3284 21 18.5 21Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          Chart
        </button>
        <button>Trading</button>
        <button>Setting</button>
      </div>
    </main>
  );
}
