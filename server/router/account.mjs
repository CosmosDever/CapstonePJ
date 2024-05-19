import express from "express";
import { api } from "../controller/Account/getAPI.mjs";
import { fetchBalances } from "../controller/Account/getBalance.mjs";
import { setindicator } from "../controller/Account/indicatorset.mjs";
import { signup } from "../controller/Account/signup.mjs";
import { signin } from "../controller/Account/signin.mjs";
import { signout } from "../controller/Account/signout.mjs";
import { getindicator } from "../controller/Account/getindicator.mjs";
import { getuser } from "../controller/Account/getuser.mjs";
import { send_otp } from "../controller/Account/send_otp.mjs";
import { verifyOTP } from "../controller/Account/VerifyOTP.mjs";
import { change_pwd } from "../controller/Account/change_pwd.mjs";
const router = express.Router();

router.post("/setapi", api);
router.get("/getbalance", fetchBalances);
router.post("/setindicator", setindicator);
router.post("/getindicator", getindicator);
router.get("/getuser", getuser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/send_otp", send_otp);
router.post("/verifyOTP", verifyOTP);
router.post("/change_pwd", change_pwd);

export default router;
