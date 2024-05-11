import { Link } from "react-router-dom";
import { useState } from "react";
import { Axios } from "axios";
export default function SignIn() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3605/Account/signin", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <main className="bg-gradient-to-br from-[#171A1E] from-35%  to-[#776212] to-100% w-screen h-screen flex content-center items-center justify-center ">
      <div className="w-11/12 h-9/12 sm:w-2/3 md:w-2/3  lg:w-2/5 lg:h-2/6 xl:w-1/3 xl:h-3/6 bg-white bg-opacity-10 rounded-3xl flex content-center ">
        <div className=" flex flex-col w-full p-10 lg:p-10 gap-5">
          <h1 className="text-3xl text-white font-bold  ">Sign In</h1>
          <form className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-white ml-2 ">Username</label>
              <input
                type="username"
                id="username"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={username}
                required
                onChange={(e) => setusername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-sm text-white ml-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full h-10 bg-white  rounded-2xl p-5"
                value={password}
                required
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-6/12 h-10 bg-[#E2B000] rounded-2xl "
                onClick={handleSubmit}
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
                  <Link to="/forgotpwd">Forgot password</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
