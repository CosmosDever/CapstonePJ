import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./page/login";
import Signup from "./page/signup";
import Changepasswordemail from "./page/cpw_email";
import Changepasswordotp from "./page/cpw_verifyOTP";
import ChangepasswordNewpassword from "./page/cpw_newpw";
import Trading from "./page/trading";
import "./App.css";
import Chart from "./page/chart";
import Setting from "./page/setting";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/Trading" element={<Trading />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changepassword" element={<Changepasswordemail />} />
        <Route
          path="/changepassword/verifyOTP"
          element={<Changepasswordotp />}
        />
        <Route
          path="/changepassword/newpassword"
          element={<ChangepasswordNewpassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
