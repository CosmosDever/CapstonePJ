import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import Swal from "sweetalert2";

export default function SignIn() {
  useEffect(() => {
    async function checkToken() {
      try {
        await axiosInstance.get("/checkToken").then((response) => {
          console.log(response.data);
          if (response.data.message === "have token") {
            window.location.href = "/chart";
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    checkToken();
  });

  const [signinfrom, setSigninform] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axiosInstance
        .post("Account/signin", {
          username: signinfrom.username,
          password: signinfrom.password,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "signin success") {
            window.location.href = "/chart";
          }
          if (response.data.message !== "signin success") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
              footer: "maybe try again",
            });
          }
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "something went wrong",
        footer: "maybe try again",
      });
      console.log(error);
    }
  };
  return (
    <main className="bg-gradient-to-br from-[#171A1E] from-35%  to-[#776212] to-100% w-screen h-screen flex content-center items-center justify-center ">
      <div className="w-11/12  sm:w-2/3 md:w-2/3  lg:w-2/5  xl:w-1/3    bg-white bg-opacity-10 rounded-3xl flex content-center ">
        <div className=" flex flex-col w-full p-10 lg:p-10 gap-5">
          <h1 className="text-3xl text-white font-bold  ">Sign In</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-white ml-2 ">Username</label>
              <input
                type="username"
                id="username"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={signinfrom.username}
                required
                onChange={(e) =>
                  setSigninform({ ...signinfrom, username: e.target.value })
                }
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={signinfrom.password}
                required
                onChange={(e) =>
                  setSigninform({ ...signinfrom, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-6/12 h-10 bg-[#E2B000] text-white rounded-2xl hover:scale-110  "
              >
                Sign In
              </button>
            </div>
            <div>
              <div className="text-sm text-white w-full text-center ">
                Dont have account yet?{" "}
                <span className="text-[#E2B000]">
                  <Link to="/signup">Create account</Link>
                </span>
              </div>
              <div className="text-sm text-white w-full text-center ">
                Or{" "}
                <span className="text-[#E2B000]">
                  <Link to="/changepwd/sendOTP">Forgot password</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
