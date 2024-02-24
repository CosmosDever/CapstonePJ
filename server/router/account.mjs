import express from "express";
import { api } from "../controller/Account/getAPI.mjs";
import { fetchBalances } from "../controller/Account/getBalance.mjs";
import { setindicator } from "../controller/Account/indicatorset.mjs";
const router = express.Router();

router.post("/setapi", api);
router.get("/getBalance", fetchBalances);
router.post("/setindicator", setindicator);
export default router;
