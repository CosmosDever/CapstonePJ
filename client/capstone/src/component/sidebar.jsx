import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axiosinstance";
import { Route, Routes } from "react-router-dom";

export default function Sidebar() {
  const [userfrom, setUserfrom] = useState({
    username: "",
  });
  const [accountbalance, setAccountbalance] = useState({
    balance: "Please set api in setting",
  });
  const [loading, setLoading] = useState(true); // Add loading state

  const handleSignout = () => {
    try {
      axiosInstance.post("Account/signout").then((response) => {
        console.log(response.data);
        if (response.data.message === "signout success") {
          window.location.href = "/";
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function checkToken() {
      try {
        await axiosInstance.get("/checkToken").then((response) => {
          console.log(response.data.token.ctoken.username);

          if (response.data.message !== "have token") {
            window.location.href = "/signin";
          }
          setUserfrom({
            username: response.data.token.ctoken.username,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function getBalance() {
      try {
        await axiosInstance
          .get("Account/getBalance")
          .then((response) => {
            console.log(response.data);
            if (response.data.massege === "success") {
              setAccountbalance({
                balance: response.data.usdt,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchData() {
      setLoading(true);
      await checkToken();
      await getBalance();
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-2/5 md:w-1/5 flex items-center justify-center bg-black bg-opacity-10">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full text-white bg-black bg-opacity-10  w-2/5 md:w-1/5 flex flex-col  items-center justify-center ">
        <div className="gap-10 flex flex-col items-center justify-center">
          <div className="text-2xl text-white">{userfrom.username}</div>
          <div className="flex flex-col  items-center justify-center text-lg text-white text-opacity-75">
            Account Balance
            <div className="text-lg text-[#FFC700] text-center">
              {accountbalance.balance}$
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            className="text-2xl flex items-center justify-center  w-full gap-2 p-5 hover:bg-[#D9D9D9] hover:bg-opacity-10 hover:border-l-4 hover:border-[#FFC700]"
            onClick={() => (window.location.href = "/Chart")}
          >
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
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Chart
          </button>
          <button
            className="text-2xl flex items-center justify-center w-full gap-2 p-5 hover:bg-[#D9D9D9] hover:bg-opacity-10 hover:border-l-4 hover:border-[#FFC700]"
            onClick={() => (window.location.href = "/Trading")}
          >
            <span>
              <svg
                fill="#ffffff"
                height="24px"
                width="24px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 612.007 612.007"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M306.01,342.452c-124.984,0-231.013-40.412-283.807-100.817v12.169c1.203,83.63,128.511,151.872,283.807,151.872
			c153.344,0,283.298-69.975,283.793-152.807v-11.241C537.016,302.033,430.987,342.452,306.01,342.452z"
                    />
                    <path
                      d="M306.01,441.537c-124.688,0-230.923-40.55-283.807-101.031v16.164c1.203,83.623,128.511,151.866,283.807,151.866
			c153.344,0,283.298-69.975,283.793-152.801v-15.153C536.982,401.063,430.87,441.537,306.01,441.537z"
                    />
                    <path
                      d="M306.01,544.403c-124.688,0-230.923-40.55-283.807-101.031v16.755c1.203,83.636,128.511,151.879,283.807,151.879
			c153.344,0,283.298-69.975,283.793-152.807v-15.751C536.982,503.929,430.87,544.403,306.01,544.403z"
                    />
                    <path
                      d="M365.68,192.917c0-5.335-2.956-9.364-8.855-12.1c-5.906-2.736-14.953-4.792-27.15-6.188v35.813
			C353.676,208.407,365.68,202.563,365.68,192.917z"
                    />
                    <path
                      d="M255.34,126.049c6.188,2.798,15.579,4.957,28.161,6.476V95.95c-14.128,1.018-23.898,3.08-29.329,6.188
			c-5.418,3.114-8.126,7.02-8.126,11.715C246.045,119.195,249.139,123.258,255.34,126.049z"
                    />
                    <path
                      d="M306.01,306.584c153.839,0,283.793-70.195,283.793-153.296C589.804,70.195,459.849,0,306.01,0
			S22.203,70.195,22.203,153.289C22.203,236.389,152.172,306.584,306.01,306.584z M189.414,93.379
			c4.654-6.538,11.323-12.19,20.041-16.954c8.711-4.758,19.312-8.601,31.798-11.53c12.485-2.915,26.573-4.95,42.241-6.098V39.182
			h46.174V58.24c14.128,0.502,28.504,1.554,43.121,3.135c14.61,1.602,28.023,3.788,40.213,6.573v37.717
			c-29.811-6.353-57.586-9.9-83.334-10.67v42.289c12.197,1.272,24.249,2.956,36.156,5.046c11.908,2.097,22.551,5.136,31.942,9.144
			c9.385,4.001,17.03,9.24,22.942,15.717c5.899,6.47,8.855,14.788,8.855,24.95c0,16.26-8.67,29.027-25.981,38.288
			c-17.332,9.275-41.966,15.05-73.908,17.332v19.622h-46.174v-18.666c-18.969-0.385-36.823-1.492-53.571-3.334
			c-16.741-1.843-30.629-4.414-41.67-7.714v-37.325c7.556,1.781,14.905,3.334,22.069,4.675c7.164,1.327,14.513,2.468,22.069,3.424
			c7.549,0.956,15.49,1.712,23.816,2.289c8.312,0.571,17.415,0.921,27.288,1.045v-41.719c-12.183-1.141-24.283-2.702-36.287-4.668
			c-12.011-1.966-22.798-4.916-32.382-8.855c-9.584-3.933-17.374-9.151-23.369-15.62c-6.009-6.47-9-14.857-9-25.142
			C182.457,107.376,184.774,99.924,189.414,93.379z"
                    />
                  </g>
                </g>
              </svg>
            </span>
            Trading
          </button>
          <button
            className="text-2xl flex items-center justify-center w-full gap-2 p-5 hover:bg-[#D9D9D9] hover:bg-opacity-10 hover:border-l-4 hover:border-[#FFC700]   "
            onClick={() => (window.location.href = "/Setting")}
          >
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="icons_Q2" data-name="icons Q2">
                      {" "}
                      <path d="M40.2,29.2l5.5-1.5a23,23,0,0,0,0-7.4l-5.5-1.5a1.8,1.8,0,0,1-1.1-2.6l2.8-5a20.6,20.6,0,0,0-5.1-5.1l-5,2.8-.8.2a1.8,1.8,0,0,1-1.8-1.3L27.7,2.3a23,23,0,0,0-7.4,0L18.8,7.8A1.8,1.8,0,0,1,17,9.1l-.8-.2-5-2.8a20.6,20.6,0,0,0-5.1,5.1l2.8,5a1.8,1.8,0,0,1-1.1,2.6L2.3,20.3a23,23,0,0,0,0,7.4l5.5,1.5a1.8,1.8,0,0,1,1.1,2.6l-2.8,5a20.6,20.6,0,0,0,5.1,5.1l5-2.8.8-.2a1.8,1.8,0,0,1,1.8,1.3l1.5,5.5a23,23,0,0,0,7.4,0l1.5-5.5A1.8,1.8,0,0,1,31,38.9l.8.2,5,2.8a20.6,20.6,0,0,0,5.1-5.1l-2.8-5A1.8,1.8,0,0,1,40.2,29.2ZM24,33a9,9,0,1,1,9-9A9,9,0,0,1,24,33Z" />{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </span>
            Setting
          </button>
          <button
            className="mt-16 text-xl flex items-center justify-center w-full gap-2 p-5 hover:bg-[#D9D9D9] hover:bg-opacity-10 hover:border-l-4 hover:border-[#FFC700]   "
            onClick={() => handleSignout()}
          >
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z"
                  fill="#ffffff"
                />
              </svg>
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
