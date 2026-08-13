import {} from "express";
import { studentService } from "../services/student.service.js";
export class StudentController {
    async getStudents(req, res, next, validatedData) {
        const query = validatedData || req.query;
        const page = Number(query.page) || 1;
        const pageSize = Number(query.pageSize) || 10;
        const params = { page, pageSize };
        if (query.search)
            params.search = query.search;
        if (query.grade)
            params.grade = query.grade;
        if (query.status)
            params.status = query.status;
        try {
            const result = await studentService.getStudents(params);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getStudentProfile(req, res, next) {
        try {
            const { admNo } = req.params;
            const profile = await studentService.getStudentProfile(admNo);
            if (!profile) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found",
                });
            }
            res.status(200).json({
                success: true,
                data: profile,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPersonalDetails(req, res, next) {
        try {
            const { admNo } = req.params;
            const student = await studentService.getPersonalDetails(admNo);
            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found",
                });
            }
            res.status(200).json({
                success: true,
                data: student,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async addStudent(req, res, next) {
        try {
            const student = await studentService.addStudent(req.body);
            res.status(201).json({
                success: true,
                message: "Student added successfully",
                data: student,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateStudent(req, res, next) {
        try {
            const { admNo } = req.params;
            const student = await studentService.updateStudent(admNo, req.body);
            res.status(200).json({
                success: true,
                message: "Student updated successfully",
                data: student,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteStudent(req, res, next) {
        try {
            const { admNo } = req.params;
            await studentService.deleteStudent(admNo);
            res.status(200).json({
                success: true,
                message: "Student deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export const studentController = new StudentController();
