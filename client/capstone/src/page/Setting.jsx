import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import Sidebar from "../component/sidebar";

export default function Setting() {
  const [userfrom, setUserfrom] = useState({
    email: "",
    username: "",
  });
  const [api_keyfrom, setApi_keyfrom] = useState({
    api_key: "",
    secret_key: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  function obfuscateEmail(email) {
    let [local, domain] = email.split("@");

    let firstThree = local.substring(0, 3);

    let obfuscatedLocal = firstThree + "*".repeat(local.length - 3);

    return obfuscatedLocal + "@" + domain;
  }

  const Api_submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("Account/setapi", {
        API_KEY: api_keyfrom.api_key,
        API_SECRET: api_keyfrom.secret_key,
      });
      console.log(response);

      setShowPopup(false);
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  };

  useEffect(() => {
    axiosInstance.get("/checkToken").then((response) => {
      console.log(response.data.token.ctoken);
      setUserfrom({
        ...userfrom,
        email: obfuscateEmail(response.data.token.ctoken.email),
        username: response.data.token.ctoken.username,
      });
    });
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#776212] via-[#171A1E] to-[#100F4A] w-screen h-screen flex justify-between">
      <Sidebar />
      <div className="flex-1 flex w-full h-full items-center justify-center">
        <div className="w-11/12 h-5/6 flex-col  rounded-3xl flex content-center items-center justify-center">
          <div className="flex flex-col w-full p-5  gap-5">
            <h1 className="text-3xl text-white font-bold  ml-5">Email</h1>
            <div className="w-full h-10 bg-[#958750] bg-opacity-10  rounded-2xl p-5 flex items-center ">
              <div className="text-white">{userfrom.email}</div>
            </div>
          </div>
          <div className="flex flex-col w-full p-5 gap-5">
            <h1 className="text-3xl text-white font-bold  ml-5">Username</h1>
            <div className="w-full h-10 bg-[#958750] bg-opacity-10  rounded-2xl p-5 flex  items-center">
              <div className="text-white ">{userfrom.username}</div>
            </div>
          </div>
          <div className="flex flex-col w-full p-5 gap-5 lg:flex-row ">
            <button
              className="flex items-center justify-center  w-2/5 gap-2 p-3 bg-[#E2B000] hover:bg-[#E2B000]/80 rounded-2xl"
              onClick={() => setShowPopup(true)}
            >
              <span className="text-white text-sm lg:text-2xl">
                Set up your Api Key
              </span>
            </button>
            <button
              className="flex items-center justify-center  w-2/5 gap-2 p-3 bg-[#E2B000] hover:bg-[#E2B000]/80 rounded-2xl"
              onClick={() => (window.location.href = "/changepwd/sendOTP")}
            >
              <span className="text-white text-sm lg:text-2xl">
                Change Password
              </span>
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Set up your API Key</h2>
            <form onSubmit={Api_submit}>
              <div className="mb-4">
                <label
                  htmlFor="api_key"
                  className="block text-gray-700 font-bold mb-2"
                >
                  API Key
                </label>
                <input
                  type="text"
                  id="api_key"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your API Key"
                  value={api_keyfrom.api_key}
                  onChange={(e) =>
                    setApi_keyfrom({ ...api_keyfrom, api_key: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="secret_key"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Secret Key
                </label>
                <input
                  type="text"
                  id="secret_key"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your Secret Key"
                  value={api_keyfrom.secret_key}
                  onChange={(e) =>
                    setApi_keyfrom({
                      ...api_keyfrom,
                      secret_key: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="cancel"
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
