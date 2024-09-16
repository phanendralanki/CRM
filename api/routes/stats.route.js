// Fetch stats filtered by user role
import express from "express";
import { Issue } from "../models/issue.model.js";
const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const issueTypeStats = await Issue.aggregate([
          { $group: { _id: "$issueType", count: { $sum: 1 } } },
        ]);
    
        const statusStats = await Issue.aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ]);
    
        res.json({
          issueTypeStats,
          statusStats,
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching stats", error });
      }
});

export default router;