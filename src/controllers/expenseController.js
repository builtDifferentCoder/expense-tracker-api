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

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Expense updated successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
