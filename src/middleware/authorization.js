import Expense from "../models/expense.js";

export async function authorizeMiddleware(req, res, next) {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    console.log(req.userInfo.userId, expense.userId.toString());
    if (req.userInfo.userId === expense.userId.toString()) {
      console.log("Working");
      return next();
    }
    return res.status(403).json({ message: "You are not authorized" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
}
