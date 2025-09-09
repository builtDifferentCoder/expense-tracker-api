import express from "express";
import authenticationMiddleware from "../middleware/authentication.js";
import { addExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.route("/").post(authenticationMiddleware, addExpense);

export default router;
