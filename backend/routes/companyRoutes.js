const express = require("express");
const router = express.Router();

const {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany
} = require("../controllers/companyController");

// 🔐 Import middleware
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// 👁️ View (user + admin)
router.get("/", authMiddleware, getCompanies);

// 👑 Admin only
router.post("/", authMiddleware, isAdmin, addCompany);
router.patch("/:id", authMiddleware, isAdmin, updateCompany);
router.delete("/:id", authMiddleware, isAdmin, deleteCompany);

module.exports = router;