import { Route, Routes } from "react-router-dom";
import SignIn from "./component/SignIn";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  );
}
