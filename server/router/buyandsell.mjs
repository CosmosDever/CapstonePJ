import express from "express";
import { buysellorder } from "../controller/BuyandSell/buysell.mjs";
import { getorder } from "../controller/BuyandSell/getorder.mjs";
import { get24hStatististics } from "../controller/BuyandSell/get24hStatististics.mjs";
const router = express.Router();
router.post("/BuySellOrder", buysellorder);
router.get("/GetOrder", getorder);
router.get("/Get24hStatististics", get24hStatististics);
export default router;
