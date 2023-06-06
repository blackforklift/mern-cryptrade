import express from "express";
import { getOhlc } from "../controllers/management.js";

const router = express.Router();
router.get("/anasayfa",getOhlc);

export default router;