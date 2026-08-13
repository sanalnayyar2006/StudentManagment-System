import { prisma } from "../config/prisma.js";

export class StudentRepository {
  async findAll(params: {
    page: number;
    pageSize: number;
    search?: string;
    grade?: string;
    status?: string;
  }) {
    const where: any = {}

    if (params.search) {
      const q = params.search.toLowerCase()
      where.OR = [
        { admissionNo: { contains: q } },
      ]
    }

    if (params.status && params.status !== 'all') {
      where.feeStatus = params.status
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip: (params.page - 1) * params.pageSize,
        take: params.pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.student.count({ where }),
    ])

    const studentsWithRelations = await Promise.all(
      students.map(async (student) => {
        const [profile, studentClass, govDetails, prevRecord, scholarships, facilities] = await Promise.all([
          prisma.studentProfile.findUnique({ where: { studentId: student.id } }),
          prisma.studentClass.findFirst({ where: { studentId: student.id } }),
          prisma.govRequiredDetails.findUnique({ where: { studentId: student.id } }),
          prisma.previousAcademicRecord.findUnique({ where: { studentId: student.id } }),
          prisma.scholarShipDetails.findMany({ where: { studentId: student.id } }),
          prisma.facilitesProvided.findFirst({ where: { studentId: student.id } }),
        ])

        return {
          ...student,
          StudentProfile: profile,
          StudentClass: studentClass,
          GovRequiredDetails: govDetails,
          PreviousAcademicRecord: prevRecord,
          ScholarShipDetails: scholarships,
          FacilitesProvided: facilities,
        }
      })
    )

    return { students: studentsWithRelations, total }
  }

  async findByAdmissionNo(admissionNo: string) {
    const student = await prisma.student.findUnique({
      where: { admissionNo },
    })

    if (!student) return null

    const [profile, studentClass, govDetails, prevRecord, scholarships, facilities] = await Promise.all([
      prisma.studentProfile.findUnique({ where: { studentId: student.id } }),
      prisma.studentClass.findFirst({ where: { studentId: student.id } }),
      prisma.govRequiredDetails.findUnique({ where: { studentId: student.id } }),
      prisma.previousAcademicRecord.findUnique({ where: { studentId: student.id } }),
      prisma.scholarShipDetails.findMany({ where: { studentId: student.id } }),
      prisma.facilitesProvided.findFirst({ where: { studentId: student.id } }),
    ])

    return {
      ...student,
      StudentProfile: profile,
      StudentClass: studentClass,
      GovRequiredDetails: govDetails,
      PreviousAcademicRecord: prevRecord,
      ScholarShipDetails: scholarships,
      FacilitesProvided: facilities,
    }
  }

  async findById(id: number) {
    const student = await prisma.student.findUnique({
      where: { id },
    })

    if (!student) return null

    const [profile, studentClass, govDetails, prevRecord, scholarships, facilities] = await Promise.all([
      prisma.studentProfile.findUnique({ where: { studentId: student.id } }),
      prisma.studentClass.findFirst({ where: { studentId: student.id } }),
      prisma.govRequiredDetails.findUnique({ where: { studentId: student.id } }),
      prisma.previousAcademicRecord.findUnique({ where: { studentId: student.id } }),
      prisma.scholarShipDetails.findMany({ where: { studentId: student.id } }),
      prisma.facilitesProvided.findFirst({ where: { studentId: student.id } }),
    ])

    return {
      ...student,
      StudentProfile: profile,
      StudentClass: studentClass,
      GovRequiredDetails: govDetails,
      PreviousAcademicRecord: prevRecord,
      ScholarShipDetails: scholarships,
      FacilitesProvided: facilities,
    }
  }

  async create(data: any) {
    return prisma.student.create({
      data,
    })
  }

  async update(id: number, data: any) {
    return prisma.student.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return prisma.student.delete({
      where: { id },
    })
  }

  async count() {
    return prisma.student.count()
  }
}

export const studentRepository = new StudentRepository()
