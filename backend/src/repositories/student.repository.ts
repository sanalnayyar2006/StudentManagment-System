import { prisma } from "../config/prisma.js";

export class StudentRepository {
  async findAll(params: {
    page: number;
    pageSize: number;
    search?: string;
    grade?: string;
    status?: string;
  }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        include: {
          StudentProfile: true,
          StudentClass: true,
          GovRequiredDetails: true,
          PreviousAcademicRecord: true,
          ScholarShipDetails: true,
          FacilitesProvided: true,
        },
      }),
      prisma.student.count({ where }),
    ])

    return { students, total }
  }

  async findByAdmissionNo(admissionNo: string) {
    const student = await prisma.student.findUnique({
      where: { admissionNo },
      include: {
        StudentProfile: true,
        StudentClass: true,
        GovRequiredDetails: true,
        PreviousAcademicRecord: true,
        ScholarShipDetails: true,
        FacilitesProvided: true,
      },
    })

    return student
  }

  async findById(id: number) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        StudentProfile: true,
        StudentClass: true,
        GovRequiredDetails: true,
        PreviousAcademicRecord: true,
        ScholarShipDetails: true,
        FacilitesProvided: true,
      },
    })

    return student
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(data: any) {
    return prisma.student.create({
      data,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
