import express from "express";
import authenticationMiddleware from "../middleware/authentication.js";
import {
  addExpense,
  deleteController,
  getController,
  updateExpense,
} from "../controllers/expenseController.js";
import { authorizeMiddleware } from "../middleware/authorization.js";

const router = express.Router();

router.route("/").post(authenticationMiddleware, addExpense);
router
  .route("/:id")
  .put(authenticationMiddleware, authorizeMiddleware, updateExpense)
  .delete(authenticationMiddleware, authorizeMiddleware, deleteController);

router.get("/", getController);
export default router;
