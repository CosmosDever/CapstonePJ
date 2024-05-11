import { Route, Routes } from "react-router-dom";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Home from "./page/Home";
import Changepwd_send_otp from "./page/SendOPT";
import Changepwd_VerifyOtp from "./page/VerifyOTP";
import Changepwd_page from "./page/ChangePWD_page";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
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
