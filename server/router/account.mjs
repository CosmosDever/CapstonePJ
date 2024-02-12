import express from "express";
import { api } from "../controller/Account/getAPI.mjs";
import { fetchBalances } from "../controller/Account/getBalance.mjs";
const router = express.Router();

router.post("/setapi", api);
router.get("/getBalance", fetchBalances);

export default router;
