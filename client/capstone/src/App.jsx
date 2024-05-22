import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Page/signin";
import Signup from "./Page/signup";
import Changepasswordemail from "./Page/cpw_email";
import Changepasswordotp from "./Page/cpw_verifyOTP";
import ChangepasswordNewpassword from "./Page/cpw_newpw";
import Trading from "./Page/Trading";
import "./App.css";
import Chart from "./Page/Chart";
import Setting from "./Page/setting";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chart />} />
      <Route path="/Trading" element={<Trading />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/changepassword" element={<Changepasswordemail />} />
      <Route path="/changepassword/verifyOTP" element={<Changepasswordotp />} />
      <Route
        path="/changepassword/newpassword"
        element={<ChangepasswordNewpassword />}
      />
    </Routes>
  );
}

export default App;
