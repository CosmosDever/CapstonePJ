import { useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import { useParams } from "react-router-dom";
export default function Changepwd() {
  const { email } = useParams();
  const [changepwdfrom, setChangepwdfrom] = useState({
    email: email,
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = (e) => {
    console.log(changepwdfrom);
    if (changepwdfrom.password !== changepwdfrom.confirmpassword) {
      alert("password not match");
      return;
    }
    e.preventDefault();
    axiosInstance
      .post("Account/change_pwd", {
        email: changepwdfrom.email,
        password: changepwdfrom.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "password update") {
          window.location.href = "/home";
        }
        if (response.data.message !== "password changed") {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
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
          className="bg-[#E2B000] font-bold py-2 px-4 rounded"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}
