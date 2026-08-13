export interface Student {
  admNo: string
  name: string
  firstName: string
  lastName: string
  grade: string
  gradeNumber: number
  parent: string
  contact: string
  feeStatus: 'paid' | 'overdue'
  enrollmentDate: string
  attendance: number
  session: string
  status: 'Active Student'
  feeOverallStatus: 'Clear' | 'Overdue'
  prescribedFee: string
  totalPaid: string
  collectedPercent: number
  remaining: string
  nextDue: string
  father: string
  fatherOccupation: string
  mother: string
  motherOccupation: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
  photo: string
  bloodGroup: string
  allergies: string
  schoolUdise: string
  admissionDate: string
  section: string
  rollNo: string
  studentStream: string
  academicYear: string
  className: string
  stream: string
  comingFrom: string
  gender: string
  dob: string
  motherTongue: string
  socialCategory: string
  minorityGroup: string
  outOfSchoolChild: string
  indianNational: string
  nationality: string
  aadhaarNo: string
  aadhaarNumber: string
  nameAsPerAadhaar: string
  guardianName: string
  alternateMobile: string
  bplBeneficiary: string
  antyodayaBeneficiary: string
  ewsDisadvantaged: string
  disadvantagedGroup: string
  cwsn: string
  impairmentDetails: string
  disabilityDetails: string
  previousSchoolingStatus: string
  previousClass: string
  admittedUnder: string
  previousSchool: string
  enrolledUnder: string
  appearedForExam: string
  appearedPreviousExam: string
  previousExamResult: string
  result: string
  previousMarksPercent: string
  marks: string
  previousDaysAttended: string
  daysAttended: string
  scholarshipType: string
  scholarshipName: string
  scholarshipAmount: string
  amount: string
  freeUniform: string
  freeTextbooks: string
  extraCurricularActivity: string
  extraCurricular: string
  facilityProvidedToCSWN: string
  specificLearningDisability: string
  typeofSpecificLearningDisability: string
  autismSpectrumDisorder: string
  attentionDeficitHyperactiveDisorder: string
}

export interface FeeTransaction {
  receiptId: string
  head: string
  date: string
  method: string
  amount: string
}

export interface StudentsQueryParams {
  page: number
  pageSize: number
  search?: string
  grade?: string
  status?: 'paid' | 'overdue' | 'all'
}

export interface StudentsResponse {
  students: Student[]
  total: number
  page: number
  pageSize: number
}

export interface StudentProfile {
  student: Student
  transactions: FeeTransaction[]
}

export async function getStudents(params: StudentsQueryParams): Promise<StudentsResponse> {
  const query = new URLSearchParams()
  query.set('page', String(params.page))
  query.set('pageSize', String(params.pageSize))
  if (params.search) query.set('search', params.search)
  if (params.grade) query.set('grade', params.grade)
  if (params.status && params.status !== 'all') query.set('status', params.status)

  const response = await fetch(`/api/students?${query.toString()}`, {
    credentials: 'include',
  })
  const json = await response.json()
  if (!json.success) throw new Error(json.message || 'Failed to fetch students')
  return json.data
}

export async function getStudentProfile(admNo: string): Promise<StudentProfile | null> {
  const response = await fetch(`/api/students/${encodeURIComponent(admNo)}`, {
    credentials: 'include',
  })
  const json = await response.json()
  if (!json.success) return null
  return json.data
}

export async function getPersonalDetails(admNo: string): Promise<Student | null> {
  const response = await fetch(`/api/students/${encodeURIComponent(admNo)}/personal-details`, {
    credentials: 'include',
  })
  const json = await response.json()
  if (!json.success) return null
  return json.data
}

export async function updateStudent(admNo: string, data: Partial<Student>): Promise<Student | null> {
  const response = await fetch(`/api/students/${encodeURIComponent(admNo)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  const json = await response.json()
  if (!json.success) throw new Error(json.message || 'Failed to update student')
  return json.data
}

export async function addStudent(data: Omit<Student, 'admNo'>): Promise<Student> {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  const json = await response.json()
  if (!json.success) throw new Error(json.message || 'Failed to add student')
  return json.data
}

export async function deleteStudent(admNo: string) {
  const response = await fetch(`/api/students/${encodeURIComponent(admNo)}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  const json = await response.json()
  if (!json.success) throw new Error(json.message || 'Failed to delete student')
  return json.data
}
