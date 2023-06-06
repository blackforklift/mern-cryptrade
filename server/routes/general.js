import express from "express";
import { getUser,getProfits, getArticles } from "../controllers/general.js";



const router = express.Router();
router.get("/user/:id",getUser);
router.get("/profits",getProfits);
router.get("/news",getArticles);


export default router;