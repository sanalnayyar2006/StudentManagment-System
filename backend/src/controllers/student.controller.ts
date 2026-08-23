import { type Request, type Response, type NextFunction } from "express";
import { studentService } from "../services/student.service.js";

export class StudentController {
  async getStudents(req: Request, res: Response, next: NextFunction, validatedData?: { page?: string; pageSize?: string; search?: string; grade?: string; status?: string }) {
    const query = validatedData || (req.query as Record<string, string | undefined>)
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10

    const params: { page: number; pageSize: number; search?: string; grade?: string; status?: string } = { page, pageSize }
    if (query.search) params.search = query.search
    if (query.grade) params.grade = query.grade
    if (query.status) params.status = query.status

    try {
      const result = await studentService.getStudents(params)
      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  async getStudentProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { admNo } = req.params
      const profile = await studentService.getStudentProfile(admNo as string)
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        })
      }
      res.status(200).json({
        success: true,
        data: profile,
      })
    } catch (error) {
      next(error)
    }
  }

  async getPersonalDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { admNo } = req.params
      const student = await studentService.getPersonalDetails(admNo as string)
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        })
      }
      res.status(200).json({
        success: true,
        data: student,
      })
    } catch (error) {
      next(error)
    }
  }

  async addStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await studentService.addStudent(req.body)
      res.status(201).json({
        success: true,
        message: "Student added successfully",
        data: student,
      })
    } catch (error) {
      next(error)
    }
  }

  async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { admNo } = req.params
      const student = await studentService.updateStudent(admNo as string, req.body)
      res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student,
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { admNo } = req.params
      await studentService.deleteStudent(admNo as string)
      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
      })
    } catch (error) {
      next(error)
    }
  }
}

export const studentController = new StudentController()
