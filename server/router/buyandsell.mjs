import express from "express";
import { buysellorder } from "../controller/BuyandSell/buysell.mjs";
import { getorder } from "../controller/BuyandSell/getorder.mjs";
const router = express.Router();
router.post("/BuySellOrder", buysellorder);
router.get("/GetOrder", getorder);
export default router;
