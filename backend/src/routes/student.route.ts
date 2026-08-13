import { Router } from "express";
import { z } from "zod";
import { studentController } from "../controllers/student.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

const studentQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  search: z.string().optional(),
  grade: z.string().optional(),
  status: z.string().optional(),
});

router.get("/", (req, res, next) => {
  const parsed = studentQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid query parameters",
      errors: parsed.error.flatten(),
    });
  }
  return studentController.getStudents(req, res, next, parsed.data);
});

router.get("/:admNo", studentController.getStudentProfile);
router.get("/:admNo/personal-details", studentController.getPersonalDetails);
router.post("/", studentController.addStudent);
router.put("/:admNo", studentController.updateStudent);
router.delete("/:admNo", studentController.deleteStudent);

export default router;
