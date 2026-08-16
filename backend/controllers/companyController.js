const Company = require("../models/companyModel");

// GET all companies
exports.getCompanies = async (req, res) => {
  const data = await Company.find();
  res.json(data);
};

// ADD company (Admin)
exports.addCompany = async (req, res) => {
  const newCompany = await Company.create(req.body);
  res.json(newCompany);
};

// UPDATE company
exports.updateCompany = async (req, res) => {
  const updated = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE company
exports.deleteCompany = async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};