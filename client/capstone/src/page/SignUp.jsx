import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import Swal from "sweetalert2";

export default function SignUp() {
  const [signupForm, setSignupForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !signupForm.email ||
      !signupForm.username ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }
    if (signupForm.username.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Username Too Short",
        text: "Username must be at least 3 characters long",
      });
      return;
    }

    if (signupForm.username.length > 20) {
      Swal.fire({
        icon: "error",
        title: "Username Too Long",
        text: "Username must be less than 20 characters long",
      });
      return;
    }

    if (signupForm.password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password Too Short",
        text: "Password must be at least 8 characters long",
      });
      return;
    }

    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    if (!validateEmail(signupForm.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
      });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
      return;
    }

    axiosInstance
      .post("Account/signup", {
        email: signupForm.email,
        username: signupForm.username,
        password: signupForm.password,
      })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === "signup success") {
          window.location.href = "/";
        } else {
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.error("There was an error with the signup!", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error with the signup. Please try again.",
        });
      });
  };

  return (
    <main className="bg-gradient-to-br from-[#171A1E] from-35% to-[#776212] to-100% w-screen h-screen flex content-center items-center justify-center ">
      <div className="w-11/12 sm:w-2/3 md:w-2/3 lg:w-2/5 xl:w-1/3 bg-white bg-opacity-10 rounded-3xl flex content-center ">
        <div className="flex flex-col w-full p-10 lg:p-10 gap-5">
          <h1 className="text-3xl text-white font-bold">Sign Up</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-white ml-2">Username</label>
              <input
                type="text"
                id="username"
                className="w-full h-10 bg-white rounded-2xl p-5"
                value={signupForm.username}
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, username: e.target.value })
                }
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full h-10 bg-white rounded-2xl p-5"
                value={signupForm.email}
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full h-10 bg-white rounded-2xl p-5"
                value={signupForm.password}
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full h-10 bg-white rounded-2xl p-5"
                value={signupForm.confirmPassword}
                required
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-6/12 h-10 bg-[#E2B000] rounded-2xl text-white hover:scale-110"
              >
                Sign Up
              </button>
            </div>
            <div>
              <div className="text-sm text-white w-full text-center">
                Already have an account?{" "}
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
