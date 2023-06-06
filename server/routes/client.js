import express from "express";

import {getTransactions}  from "../controllers/client.js"

const router = express.Router();
router.get("/alimsatimgecmisim",getTransactions);

export default router;