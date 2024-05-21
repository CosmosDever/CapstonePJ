import {
  BrowserRouter,Routes,Route,} from "react-router-dom";
import Signin from './page/login';
import Signup from './page/signup';
import Changepasswordemail from './page/cpw_email'
import Changepasswordotp from './page/cpw_verifyOTP'
import ChangepasswordNewpassword from './page/cpw_newpw'
import './App.css'

function App() {


  return (
    <BrowserRouter>
    <Routes>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/changepassword' element={<Changepasswordemail/>}/>
        <Route path='/changepassword/verifyOTP' element={<Changepasswordotp/>}/>
        <Route path='/changepassword/newpassword' element={<ChangepasswordNewpassword/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
