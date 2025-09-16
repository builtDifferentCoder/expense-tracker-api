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

export const deleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const existingExpense = await Expense.findById(id);
    if (!existingExpense) {
      return res.status(404).json({
        message: "Expense does not exist",
      });
    }
    await Expense.findByIdAndDelete(id);
    return res.status(204).json({
      message: "Expense deleted successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getController = async (req, res) => {
  try {
    const { filter } = req.query;
    if (filter === "month") {
      const monthlyExpenses = await Expense.find({ month });
      return res.status(200).json({
        expenses: monthlyExpenses,
      });
    } else if (filter == "3months") {
      const date = new Date();
      const currMonth = date.getMonth();
      const currYear = date.getFullYear();

      function padMonth(m) {
        return m < 10 ? `0${m}` : m;
      }
      if (currMonth - 3 >= 0 && currMonth <= 11) {
        const m1 = `${currYear}-${padMonth(currMonth + 1)}`;
        const m2 = `${currYear}-${padMonth(currMonth)}`;
        const m3 = `${currYear}-${padMonth(currMonth - 1)}`;
        console.log(m1, m2, m3);
      }
      const exp = await Expense.find({ month: { $in: [m1, m2, m3] } });
      return res.status(200).json({
        expenses: exp,
      });
    } else if (filter == "range") {
      const { start, end } = req.query;
      const exp = await Expense.find({ month: { $gte: start, $lte: end } });
      return res.status(200).json({
        expenses: exp,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
