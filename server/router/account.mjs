import express from "express";
import { api } from "../controller/Account/getAPI.mjs";
import { fetchBalances } from "../controller/Account/getBalance.mjs";
import { setindicator } from "../controller/Account/indicatorset.mjs";
import { signup } from "../controller/Account/signup.mjs";
import { signin } from "../controller/Account/signin.mjs";
const router = express.Router();

router.post("/setapi", api);
router.get("/getBalance", fetchBalances);
router.post("/setindicator", setindicator);
router.post("/signup", signup);
router.post("/signin", signin);
export default router;
