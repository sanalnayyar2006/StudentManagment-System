import { Router } from "express";
import { prisma } from "../config/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const totalStudents = await prisma.student.count()

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      studentChange: "+0 this month",
      feesCollected: "₹0",
      feesTarget: "0% of monthly target",
      staffAttendance: "0%",
      attendanceActive: "0/0 active today",
      pendingDues: "₹0",
      overdueCount: "0 students overdue",
      feeCollections: [],
      operationalLogs: [],
    },
  })
})

export default router
