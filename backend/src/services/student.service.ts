import { studentRepository } from "../repositories/student.repository.js";
import { AppError } from "../errors/app.error.js";
import { prisma } from "../config/prisma.js";
import { parseDate } from "../utils/date.js";

export class StudentService {
  async getStudents(params: {
    page: number;
    pageSize: number;
    search?: string;
    grade?: string;
    status?: string;
  }) {
    const { students, total } = await studentRepository.findAll(params)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedStudents = students.map((s: any) => this.mapToStudentResponse(s))

    return {
      students: mappedStudents,
      total,
      page: params.page,
      pageSize: params.pageSize,
    }
  }

  async getStudentProfile(admissionNo: string) {
    const student = await studentRepository.findByAdmissionNo(admissionNo)
    if (!student) return null

    const mappedStudent = this.mapToStudentResponse(student)

    return {
      student: mappedStudent,
      transactions: [],
    }
  }

  async getPersonalDetails(admissionNo: string) {
    const student = await studentRepository.findByAdmissionNo(admissionNo)
    if (!student) return null
    return this.mapToStudentResponse(student)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addStudent(data: any) {
    const requiredFields = [
      ['firstName', 'First Name'],
      ['lastName', 'Last Name'],
      ['dob', 'Date of Birth'],
      ['father', "Father's Name"],
      ['mother', "Mother's Name"],
      ['contact', 'Contact Number'],
      ['email', 'Email'],
      ['address', 'Address'],
      ['city', 'City'],
      ['state', 'State'],
      ['pincode', 'Pincode'],
      ['admissionDate', 'Admission Date'],
      ['grade', 'Grade/Class'],
      ['section', 'Section'],
      ['rollNo', 'Roll Number'],
      ['academicYear', 'Academic Year'],
      ['status', 'Status'],
      ['indianNational', 'Indian National'],
      ['nationality', 'Nationality'],
      ['cwsn', 'CWSN'],
    ]

    const missing = requiredFields
      .filter(([key]) => !data[key])
      .map(([, label]) => label)

    if (missing.length > 0) {
      throw new AppError(`Required fields missing: ${missing.join(', ')}`, 400)
    }

    const admissionNo = `ADM-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`

    await prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          admissionNo,
          admissionDate: parseDate(data.admissionDate),
          status: data.status || 'Active Student',
          attendance: data.attendance ?? 0,
          session: data.session || new Date().getFullYear().toString(),
          schoolId: 1,
        },
        select: {
          id: true,
          admissionNo: true,
        }
      })

      await tx.studentProfile.create({
        data: {
          studentId: student.id,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dateOfBirth: parseDate(data.dob),
          gender: data.gender,
          bloodGroup: data.bloodGroup,
          motherTongue: data.motherTongue,
          schoolUdise: data.schoolUdise,
          fatherName: data.father || '',
          motherName: data.mother || '',
          guardianName: data.guardianName,
          primaryMobile: data.contact || '',
          alternateMobile: data.alternateMobile,
          email: data.email,
          address: data.address || '',
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          photo: data.photo,
        }
      })

      await tx.studentClass.create({
        data: {
          studentId: student.id,
          academicYear: data.academicYear || new Date().getFullYear().toString(),
          className: data.className || data.grade || '',
          section: data.section,
          rollNo: data.rollNo ? Number(data.rollNo) : undefined,
          stream: data.stream,
          gradeNumber: data.gradeNumber,
        }
      })

      await tx.govRequiredDetails.create({
        data: {
          studentId: student.id,
          aadhaarNumber: data.aadhaarNo || '',
          aadhaarName: data.nameAsPerAadhaar || '',
          socialCategory: data.socialCategory,
          minorityGroup: data.minorityGroup,
          nationality: data.nationality,
          indianNational: data.indianNational || 'Yes',
          outOfSchoolChild: data.outOfSchoolChild === 'Yes',
          cwsn: data.cwsn === 'Yes',
          disabilityDetails: data.disabilityDetails,
        }
      })

      await tx.previousAcademicRecord.create({
        data: {
          studentId: student.id,
          previousSchool: data.previousSchool,
          classStudied: data.previousClass,
          previousClass: data.previousClass,
          enrolledUnder: data.enrolledUnder,
          admittedUnder: data.admittedUnder,
          appearedPreviousExam: data.appearedForExam === 'Yes',
          appearedForExam: data.appearedForExam,
          result: data.previousExamResult,
          previousExamResult: data.previousExamResult,
          marks: data.previousMarksPercent ? Number(data.previousMarksPercent) : undefined,
          previousMarksPercent: data.previousMarksPercent,
          daysAttended: data.previousDaysAttended ? Number(data.previousDaysAttended) : undefined,
          previousDaysAttended: data.previousDaysAttended,
          previousSchoolingStatus: data.previousSchoolingStatus,
        }
      })

      await tx.scholarShipDetails.create({
        data: {
          studentId: student.id,
          scholarshipType: data.scholarshipType || 'None',
          scholarshipName: data.scholarshipName || '—',
          amount: data.scholarshipAmount ? Number(data.scholarshipAmount) : undefined,
        }
      })

      await tx.facilitesProvided.create({
        data: {
          studentId: student.id,
          freeUniform: data.freeUniform === 'Yes',
          freeTextbooks: data.freeTextbooks === 'Yes',
          extraCurricular: data.extraCurricularActivity,
          facilityProvidedToCSWN: data.facilityProvidedToCSWN,
          specificLearningDisability: data.specificLearningDisability === 'Yes',
          typeofSpecificLearningDisability: data.typeofSpecificLearningDisability,
          autismSpectrumDisorder: data.autismSpectrumDisorder === 'Yes',
          attentionDeficitHyperactiveDisorder: data.attentionDeficitHyperactiveDisorder === 'Yes',
        }
      })

      return student
    })

    const fullStudent = await studentRepository.findByAdmissionNo(admissionNo)
    return this.mapToStudentResponse(fullStudent!)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateStudent(admissionNo: string, data: any) {
    const existing = await studentRepository.findByAdmissionNo(admissionNo)
    if (!existing) throw new AppError('Student not found', 404)

    await prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: { id: existing.id },
        data: {
          status: data.status,
          attendance: data.attendance,
          session: data.session,
          admissionDate: data.admissionDate ? parseDate(data.admissionDate) : undefined,
        }
      })

      await tx.studentProfile.upsert({
        where: { id: existing.StudentProfile?.id ?? 0 },
        create: {
          studentId: existing.id,
          firstName: data.firstName || existing.StudentProfile?.firstName || '',
          lastName: data.lastName || existing.StudentProfile?.lastName || '',
          dateOfBirth: parseDate(data.dob),
          gender: data.gender ?? existing.StudentProfile?.gender,
          bloodGroup: data.bloodGroup ?? existing.StudentProfile?.bloodGroup,
          motherTongue: data.motherTongue ?? existing.StudentProfile?.motherTongue,
          schoolUdise: data.schoolUdise ?? existing.StudentProfile?.schoolUdise,
          fatherName: data.father || existing.StudentProfile?.fatherName || '',
          motherName: data.mother || existing.StudentProfile?.motherName || '',
          guardianName: data.guardianName ?? existing.StudentProfile?.guardianName,
          primaryMobile: data.contact || existing.StudentProfile?.primaryMobile || '',
          alternateMobile: data.alternateMobile ?? existing.StudentProfile?.alternateMobile,
          email: data.email ?? existing.StudentProfile?.email,
          address: data.address || existing.StudentProfile?.address || '',
          city: data.city ?? existing.StudentProfile?.city,
          state: data.state ?? existing.StudentProfile?.state,
          pincode: data.pincode ?? existing.StudentProfile?.pincode,
          photo: data.photo ?? existing.StudentProfile?.photo,
        },
        update: {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: parseDate(data.dob),
          gender: data.gender,
          bloodGroup: data.bloodGroup,
          motherTongue: data.motherTongue,
          schoolUdise: data.schoolUdise,
          fatherName: data.father,
          motherName: data.mother,
          guardianName: data.guardianName,
          primaryMobile: data.contact,
          alternateMobile: data.alternateMobile,
          email: data.email,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          photo: data.photo,
        }
      })

      await tx.studentClass.upsert({
        where: { id: existing.StudentClass?.[0]?.id ?? 0 },
        create: {
          studentId: existing.id,
          academicYear: data.academicYear || existing.StudentClass?.[0]?.academicYear || new Date().getFullYear().toString(),
          className: data.className || data.grade || existing.StudentClass?.[0]?.className || '',
          section: data.section ?? existing.StudentClass?.[0]?.section,
          rollNo: data.rollNo ? Number(data.rollNo) : existing.StudentClass?.[0]?.rollNo ?? null,
          stream: data.studentStream ?? data.stream ?? existing.StudentClass?.[0]?.stream,
          gradeNumber: data.gradeNumber ?? existing.StudentClass?.[0]?.gradeNumber,
        },
        update: {
          academicYear: data.academicYear,
          className: data.className || data.grade,
          section: data.section,
          rollNo: data.rollNo ? Number(data.rollNo) : undefined,
          stream: data.studentStream ?? data.stream,
          gradeNumber: data.gradeNumber,
        }
      })

      await tx.govRequiredDetails.upsert({
        where: { id: existing.GovRequiredDetails?.id ?? 0 },
        create: {
          studentId: existing.id,
          aadhaarNumber: data.aadhaarNo || existing.GovRequiredDetails?.aadhaarNumber || '',
          aadhaarName: data.nameAsPerAadhaar || existing.GovRequiredDetails?.aadhaarName || '',
          socialCategory: data.socialCategory ?? existing.GovRequiredDetails?.socialCategory,
          minorityGroup: data.minorityGroup ?? existing.GovRequiredDetails?.minorityGroup,
          nationality: data.nationality ?? existing.GovRequiredDetails?.nationality,
          indianNational: data.indianNational || existing.GovRequiredDetails?.indianNational || 'Yes',
          outOfSchoolChild: data.outOfSchoolChild === 'Yes' ? true : existing.GovRequiredDetails?.outOfSchoolChild ?? false,
          cwsn: data.cwsn === 'Yes' ? true : existing.GovRequiredDetails?.cwsn ?? false,
          disabilityDetails: data.disabilityDetails ?? existing.GovRequiredDetails?.disabilityDetails,
        },
        update: {
          aadhaarNumber: data.aadhaarNo,
          aadhaarName: data.nameAsPerAadhaar,
          socialCategory: data.socialCategory,
          minorityGroup: data.minorityGroup,
          nationality: data.nationality,
          indianNational: data.indianNational,
          bplBeneficiary: data.bplBeneficiary !== undefined ? data.bplBeneficiary === 'Yes' : undefined,
          antyodayaBeneficiary: data.antyodayaBeneficiary !== undefined ? data.antyodayaBeneficiary === 'Yes' : undefined,
          disadvantagedGroup: data.disadvantagedGroup ?? data.ewsDisadvantaged,
          outOfSchoolChild: data.outOfSchoolChild !== undefined ? data.outOfSchoolChild === 'Yes' : undefined,
          cwsn: data.cwsn !== undefined ? data.cwsn === 'Yes' : undefined,
          disabilityDetails: data.impairmentDetails ?? data.disabilityDetails,
        }
      })

      await tx.previousAcademicRecord.upsert({
        where: { id: existing.PreviousAcademicRecord?.id ?? 0 },
        create: {
          studentId: existing.id,
          previousSchool: data.comingFrom ?? data.previousSchool ?? existing.PreviousAcademicRecord?.previousSchool,
          classStudied: data.previousClass ?? existing.PreviousAcademicRecord?.classStudied,
          previousClass: data.previousClass ?? existing.PreviousAcademicRecord?.previousClass,
          enrolledUnder: data.admittedUnder ?? data.enrolledUnder ?? existing.PreviousAcademicRecord?.enrolledUnder,
          admittedUnder: data.admittedUnder ?? existing.PreviousAcademicRecord?.admittedUnder,
          appearedPreviousExam: data.appearedForExam === 'Yes' ? true : existing.PreviousAcademicRecord?.appearedPreviousExam ?? null,
          appearedForExam: data.appearedForExam ?? existing.PreviousAcademicRecord?.appearedForExam,
          result: data.previousExamResult ?? existing.PreviousAcademicRecord?.result,
          previousExamResult: data.previousExamResult ?? existing.PreviousAcademicRecord?.previousExamResult,
          marks: data.previousMarksPercent ? Number(data.previousMarksPercent) : existing.PreviousAcademicRecord?.marks ?? null,
          previousMarksPercent: data.previousMarksPercent ?? existing.PreviousAcademicRecord?.previousMarksPercent,
          daysAttended: data.previousDaysAttended ? Number(data.previousDaysAttended) : existing.PreviousAcademicRecord?.daysAttended ?? null,
          previousDaysAttended: data.previousDaysAttended ?? existing.PreviousAcademicRecord?.previousDaysAttended,
          previousSchoolingStatus: data.previousSchoolingStatus ?? existing.PreviousAcademicRecord?.previousSchoolingStatus,
        },
        update: {
          previousSchool: data.comingFrom ?? data.previousSchool,
          classStudied: data.previousClass,
          previousClass: data.previousClass,
          enrolledUnder: data.admittedUnder ?? data.enrolledUnder,
          admittedUnder: data.admittedUnder,
          appearedPreviousExam: data.appearedForExam === 'Yes',
          appearedForExam: data.appearedForExam,
          result: data.previousExamResult,
          previousExamResult: data.previousExamResult,
          marks: data.previousMarksPercent ? Number(data.previousMarksPercent) : undefined,
          previousMarksPercent: data.previousMarksPercent,
          daysAttended: data.previousDaysAttended ? Number(data.previousDaysAttended) : undefined,
          previousDaysAttended: data.previousDaysAttended,
          previousSchoolingStatus: data.previousSchoolingStatus,
        }
      })

      await tx.scholarShipDetails.upsert({
        where: { id: existing.ScholarShipDetails?.[0]?.id ?? 0 },
        create: {
          studentId: existing.id,
          scholarshipType: data.scholarshipType || existing.ScholarShipDetails?.[0]?.scholarshipType || 'None',
          scholarshipName: data.scholarshipName || existing.ScholarShipDetails?.[0]?.scholarshipName || '—',
          amount: data.scholarshipAmount ? Number(data.scholarshipAmount) : existing.ScholarShipDetails?.[0]?.amount ?? null,
        },
        update: {
          scholarshipType: data.scholarshipType,
          scholarshipName: data.scholarshipName,
          amount: data.scholarshipAmount ? Number(data.scholarshipAmount) : undefined,
        }
      })

      await tx.facilitesProvided.upsert({
        where: { id: existing.FacilitesProvided?.id ?? 0 },
        create: {
          studentId: existing.id,
          freeUniform: data.freeUniform === 'Yes' ? true : existing.FacilitesProvided?.freeUniform ?? false,
          freeTextbooks: data.freeTextbooks === 'Yes' ? true : existing.FacilitesProvided?.freeTextbooks ?? false,
          extraCurricular: data.extraCurricularActivity ?? existing.FacilitesProvided?.extraCurricular,
          facilityProvidedToCSWN: data.facilityProvidedToCSWN ?? existing.FacilitesProvided?.facilityProvidedToCSWN,
          specificLearningDisability: data.specificLearningDisability === 'Yes' ? true : existing.FacilitesProvided?.specificLearningDisability ?? false,
          typeofSpecificLearningDisability: data.typeofSpecificLearningDisability ?? existing.FacilitesProvided?.typeofSpecificLearningDisability,
          autismSpectrumDisorder: data.autismSpectrumDisorder === 'Yes' ? true : existing.FacilitesProvided?.autismSpectrumDisorder ?? false,
          attentionDeficitHyperactiveDisorder: data.attentionDeficitHyperactiveDisorder === 'Yes' ? true : existing.FacilitesProvided?.attentionDeficitHyperactiveDisorder ?? false,
        },
        update: {
          freeUniform: data.freeUniform !== undefined ? data.freeUniform === 'Yes' : undefined,
          freeTextbooks: data.freeTextbooks !== undefined ? data.freeTextbooks === 'Yes' : undefined,
          extraCurricular: data.extraCurricularActivity ?? data.extraCurricular,
          facilityProvidedToCSWN: data.facilityProvidedToCSWN,
          specificLearningDisability: data.specificLearningDisability !== undefined ? data.specificLearningDisability === 'Yes' : undefined,
          typeofSpecificLearningDisability: data.typeofSpecificLearningDisability,
          autismSpectrumDisorder: data.autismSpectrumDisorder !== undefined ? data.autismSpectrumDisorder === 'Yes' : undefined,
          attentionDeficitHyperactiveDisorder: data.attentionDeficitHyperactiveDisorder !== undefined ? data.attentionDeficitHyperactiveDisorder === 'Yes' : undefined,
        }
      })
    })

    const updated = await studentRepository.findByAdmissionNo(admissionNo)
    return this.mapToStudentResponse(updated!)
  }

  async deleteStudent(admissionNo: string) {
    const existing = await studentRepository.findByAdmissionNo(admissionNo)
    if (!existing) throw new AppError('Student not found', 404)
    return studentRepository.delete(existing.id)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToStudentResponse(student: any) {
    const profile = student.StudentProfile
    const studentClass = student.StudentClass?.[0]
    const govDetails = student.GovRequiredDetails
    const prevRecord = student.PreviousAcademicRecord
    const scholarship = student.ScholarShipDetails?.[0]
    const facilities = student.FacilitesProvided

    return {
      admNo: student.admissionNo,
      name: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim(),
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      grade: studentClass?.className || '',
      gradeNumber: studentClass?.gradeNumber || 0,
      parent: profile?.guardianName || `${profile?.fatherName || ''} ${profile?.motherName || ''}`.trim(),
      contact: profile?.primaryMobile || '',
      feeStatus: student.feeStatus || 'paid',
      enrollmentDate: student.enrollmentDate ? student.enrollmentDate.toISOString().split('T')[0] : student.admissionDate.toISOString().split('T')[0],
      attendance: student.attendance ?? 0,
      session: student.session || '',
      status: student.status,
      feeOverallStatus: student.feeOverallStatus || 'Clear',
      prescribedFee: student.prescribedFee || '₹0',
      totalPaid: student.totalPaid || '₹0',
      collectedPercent: student.collectedPercent || 0,
      remaining: student.remaining || '₹0',
      nextDue: student.nextDue || '₹0',
      father: profile?.fatherName || '',
      fatherOccupation: '',
      mother: profile?.motherName || '',
      motherOccupation: '',
      email: profile?.email || '',
      address: profile?.address || '',
      city: profile?.city || '',
      state: profile?.state || '',
      pincode: profile?.pincode || '',
      photo: profile?.photo || '',
      bloodGroup: profile?.bloodGroup || '',
      allergies: profile?.allergies || '',
      schoolUdise: profile?.schoolUdise || '',
      admissionDate: student.admissionDate.toISOString().split('T')[0],
      section: studentClass?.section || '',
      rollNo: studentClass?.rollNo?.toString() || '',
      studentStream: studentClass?.stream || '',
      academicYear: studentClass?.academicYear || '',
      className: studentClass?.className || '',
      stream: studentClass?.stream || '',
      comingFrom: prevRecord?.previousSchool || '',
      gender: profile?.gender || '',
      dob: profile?.dateOfBirth ? profile.dateOfBirth.toISOString().split('T')[0] : '',
      motherTongue: profile?.motherTongue || '',
      socialCategory: govDetails?.socialCategory || '',
      minorityGroup: govDetails?.minorityGroup || '',
      outOfSchoolChild: govDetails?.outOfSchoolChild ? 'Yes' : 'No',
      indianNational: govDetails?.indianNational || 'Yes',
      nationality: govDetails?.nationality || 'Indian',
      aadhaarNo: govDetails?.aadhaarNumber || '',
      aadhaarNumber: govDetails?.aadhaarNumber || '',
      nameAsPerAadhaar: govDetails?.aadhaarName || '',
      guardianName: profile?.guardianName || '',
      alternateMobile: profile?.alternateMobile || '',
      bplBeneficiary: govDetails?.bplBeneficiary ? 'Yes' : 'No',
      antyodayaBeneficiary: govDetails?.antyodayaBeneficiary ? 'Yes' : 'No',
      ewsDisadvantaged: govDetails?.disadvantagedGroup || '',
      disadvantagedGroup: govDetails?.disadvantagedGroup || '',
      cwsn: govDetails?.cwsn ? 'Yes' : 'No',
      impairmentDetails: govDetails?.disabilityDetails || '',
      disabilityDetails: govDetails?.disabilityDetails || '',
      previousSchoolingStatus: prevRecord?.previousSchoolingStatus || '',
      previousClass: prevRecord?.previousClass || prevRecord?.classStudied || '',
      admittedUnder: prevRecord?.admittedUnder || prevRecord?.enrolledUnder || '',
      previousSchool: prevRecord?.previousSchool || '',
      enrolledUnder: prevRecord?.enrolledUnder || '',
      appearedForExam: prevRecord?.appearedForExam || prevRecord?.appearedPreviousExam ? 'Yes' : 'No',
      appearedPreviousExam: prevRecord?.appearedPreviousExam ? 'Yes' : 'No',
      previousExamResult: prevRecord?.previousExamResult || prevRecord?.result || '',
      result: prevRecord?.result || '',
      previousMarksPercent: prevRecord?.previousMarksPercent || prevRecord?.marks?.toString() || '',
      marks: prevRecord?.marks?.toString() || '',
      previousDaysAttended: prevRecord?.previousDaysAttended || prevRecord?.daysAttended?.toString() || '',
      daysAttended: prevRecord?.daysAttended?.toString() || '',
      scholarshipType: scholarship?.scholarshipType || 'None',
      scholarshipName: scholarship?.scholarshipName || '—',
      scholarshipAmount: scholarship?.amount?.toString() || '',
      amount: scholarship?.amount?.toString() || '',
      freeUniform: facilities?.freeUniform ? 'Yes' : 'No',
      freeTextbooks: facilities?.freeTextbooks ? 'Yes' : 'No',
      extraCurricularActivity: facilities?.extraCurricular || '',
      extraCurricular: facilities?.extraCurricular || '',
      facilityProvidedToCSWN: facilities?.facilityProvidedToCSWN || '',
      specificLearningDisability: facilities?.specificLearningDisability ? 'Yes' : 'No',
      typeofSpecificLearningDisability: facilities?.typeofSpecificLearningDisability || '',
      autismSpectrumDisorder: facilities?.autismSpectrumDisorder ? 'Yes' : 'No',
      attentionDeficitHyperactiveDisorder: facilities?.attentionDeficitHyperactiveDisorder ? 'Yes' : 'No',
    }
  }
}

export const studentService = new StudentService()
