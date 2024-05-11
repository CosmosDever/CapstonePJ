import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";

export default function SignUp() {
  const [signupfrom, setSignupfrom] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const handleSubmit = (e) => {
    if (signupfrom.password !== signupfrom.confirmpassword) {
      alert("password not match");
    }
    e.preventDefault();
    axiosInstance
      .post("Account/signup", {
        email: signupfrom.email,
        username: signupfrom.username,
        password: signupfrom.password,
      })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === "signup success") {
          window.location.href = "/";
        }
        if (response.data.message !== "signup success") {
          alert(response.data.message);
        }
      });
  };
  return (
    <main className="bg-gradient-to-br from-[#171A1E] from-35%  to-[#776212] to-100% w-screen h-screen flex content-center items-center justify-center ">
      <div className="w-11/12  sm:w-2/3 md:w-2/3  lg:w-2/5  xl:w-1/3   bg-white bg-opacity-10 rounded-3xl flex content-center ">
        <div className=" flex flex-col w-full p-10 lg:p-10 gap-5">
          <h1 className="text-3xl text-white font-bold  ">Sign Up</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-white ml-2 ">Username</label>
              <input
                type="username"
                id="username"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={signupfrom.username}
                required
                onChange={(e) =>
                  setSignupfrom({ ...signupfrom, username: e.target.value })
                }
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2 ">Email</label>
              <input
                type="email"
                id="email"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={signupfrom.email}
                required
                onChange={(e) =>
                  setSignupfrom({ ...signupfrom, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2 ">Password</label>
              <input
                type="password"
                id="password"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={signupfrom.password}
                required
                onChange={(e) =>
                  setSignupfrom({ ...signupfrom, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2 ">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={signupfrom.confirmpassword}
                required
                onChange={(e) =>
                  setSignupfrom({
                    ...signupfrom,
                    confirmpassword: e.target.value,
                  })
                }
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-6/12 h-10 bg-[#E2B000] rounded-2xl "
              >
                Sign Up
              </button>
            </div>
            <div>
              <div className="text-sm text-white w-full text-center ">
                Already have account?{" "}
                <span className="text-[#E2B000]">
                  <Link to="/">Sign In</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
