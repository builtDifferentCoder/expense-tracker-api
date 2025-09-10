import express from "express";
import authenticationMiddleware from "../middleware/authentication.js";
import { addExpense, updateExpense } from "../controllers/expenseController.js";
import { authorizeMiddleware } from "../middleware/authorization.js";

const router = express.Router();

router.route("/").post(authenticationMiddleware, addExpense);
router
  .route("/:id")
  .put(authenticationMiddleware, authorizeMiddleware, updateExpense);

export default router;
