import express from "express";
import { fetchBalances } from "../controller/Account/getBalance.mjs";
const router = express.Router();

router.get("/getBalance", fetchBalances);

export default router;
