import express from "express";

const router = express.Router();

// Define the root route
router.get("/", (req, res) => {
  res.send("hello world");
});

export default router;
