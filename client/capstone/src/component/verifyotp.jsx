import { useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function VerifyOtp() {
  const { email } = useParams();
  const [verifyfrom, setVerifyfrom] = useState({
    email: email,
    otp: "",
  });
  const handleSubmit = (e) => {
    console.log(verifyfrom);
    e.preventDefault();
    try {
      axiosInstance
        .post("Account/verifyOTP", {
          email: verifyfrom.email,
          otp: verifyfrom.otp,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.message === "verify success") {
            window.location.href = `/changepwd/${email}`;
          }
          if (response.data.message !== "otp verified") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          }
        });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className=" flex flex-col w-full p-10 lg:py-5 gap-5 ">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-white ml-2 ">OTP</label>
          <input
            type="otp"
            id="otp"
            className="w-full h-10 bg-white  rounded-2xl p-5"
            value={verifyfrom.otp}
            required
            onChange={(e) =>
              setVerifyfrom({ ...verifyfrom, otp: e.target.value })
            }
            placeholder="Enter your otp"
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
