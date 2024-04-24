import express from "express";
import { buysellorder } from "../controller/BuyandSell/buysell.mjs";
const router = express.Router();
router.post("/BuySellOrder", buysellorder);
export default router;
