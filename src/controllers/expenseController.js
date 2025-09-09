import Expense from "../models/expense.js";

export const addExpense = async (req, res) => {
  try {
    const { title, description, category, month, userId } = req.body;
    const expense = new Expense({
      title,
      description,
      category,
      month,
      userId,
    });
    await expense.save();
    return res.status(201).json({
      message: "Expense created successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
