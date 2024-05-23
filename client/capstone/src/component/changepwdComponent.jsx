import { useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function Changepwd() {
  const { email } = useParams();
  const [changepwdfrom, setChangepwdfrom] = useState({
    email: email,
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (changepwdfrom.password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password Too Short",
        text: "Password must be at least 8 characters long",
      });
      return;
    }
    if (changepwdfrom.password !== changepwdfrom.confirmpassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password does not match",
      });
      return;
    }

    axiosInstance
      .post("Account/change_pwd", {
        email: changepwdfrom.email,
        password: changepwdfrom.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "password update") {
          try {
            axiosInstance.post("Account/signout").then((response) => {
              console.log(response.data);
              if (response.data.message === "signout success") {
              }
            });
          } catch (error) {
            console.log(error);
          }
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password Updated",
            confirmButtonText: "Back to Sign In",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            }
          });
        }
        if (response.data.message !== "password update") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };
  return (
    <div className=" flex flex-col w-full p-10 lg:py-5 gap-5 ">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-white ml-2 ">New Password</label>
          <input
            type="password"
            id="password"
            className="w-full h-10 bg-white  rounded-2xl p-5"
            value={changepwdfrom.password}
            required
            onChange={(e) =>
              setChangepwdfrom({ ...changepwdfrom, password: e.target.value })
            }
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label className="text-sm text-white ml-2 ">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            className="w-full h-10 bg-white  rounded-2xl p-5"
            value={changepwdfrom.confirmpassword}
            required
            onChange={(e) =>
              setChangepwdfrom({
                ...changepwdfrom,
                confirmpassword: e.target.value,
              })
            }
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-[#E2B000] font-bold py-2 px-4 rounded text-white hover:scale-110"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
