import { Route, Routes } from "react-router-dom";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Chart from "./page/Chart";
import Setting from "./page/Setting";
import Changepwd_send_otp from "./page/SendOPT";
import Changepwd_VerifyOtp from "./page/VerifyOTP";
import Changepwd_page from "./page/ChangePWD_page";
import Trading from "./page/Trading";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<SignIn />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/changepwd/sendOTP" element={<Changepwd_send_otp />} />
        <Route
          path="/changepwd/verifyotp/:email"
          element={<Changepwd_VerifyOtp />}
        />
        <Route path="/changepwd/:email" element={<Changepwd_page />} />
      </Routes>
    </>
  );
}
