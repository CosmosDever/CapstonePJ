import { useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import Swal from "sweetalert2";
export default function Emailfind() {
  const [emailfindfrom, setEmailfindfrom] = useState({
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("Account/send_otp", {
        email: emailfindfrom.email,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "email send") {
          window.location.href = `/changepwd/verifyotp/${emailfindfrom.email}`;
        }
        if (response.data.message !== "email send") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      });
  };
  return (
    <div className=" flex flex-col w-full p-10 lg:py-5 gap-5 ">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-white ml-2 ">Email</label>
          <input
            type="email"
            id="email"
            className="w-full h-10 bg-white  rounded-2xl p-5"
            value={emailfindfrom.email}
            required
            onChange={(e) =>
              setEmailfindfrom({ ...emailfindfrom, email: e.target.value })
            }
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="bg-[#E2B000] font-bold py-2 px-4 rounded text-white hover:scale-110"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}
