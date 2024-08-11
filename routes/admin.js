const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticateToken, authorize } = require("../middlewares/auth");

// Route for admins to delete users
router.delete(
  "/delete-user/:id",
  authenticateToken,
  authorize(["admin"]),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      await User.findByIdAndDelete(userId);
      res.send(`User with ID ${userId} has been deleted`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// Route for admins to get a list of all users
router.get(
  "/users",
  authenticateToken,
  authorize(["admin"]),
  async (req, res) => {
    try {
      const users = await User.find({}, "username email role _id");
      res.json(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
