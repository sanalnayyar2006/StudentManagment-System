export interface Student {
  admNo: string
  name: string
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
  bloodGroup: string
  allergies: string
  schoolUdise: string
  admissionDate: string
  section: string
  rollNo: string
  studentStream: string
  comingFrom: string
  gender: string
  dob: string
  motherTongue: string
  socialCategory: string
  minorityGroup: string
  outOfSchoolChild: string
  indianNational: string
  aadhaarNo: string
  nameAsPerAadhaar: string
  guardianName: string
  alternateMobile: string
  pincode: string
  bplBeneficiary: string
  antyodayaBeneficiary: string
  ewsDisadvantaged: string
  cwsn: string
  impairmentDetails: string
  previousSchoolingStatus: string
  previousClass: string
  admittedUnder: string
  appearedForExam: string
  previousExamResult: string
  previousMarksPercent: string
  previousDaysAttended: string
  scholarshipType: string
  scholarshipName: string
  scholarshipAmount: string
  freeUniform: string
  freeTextbooks: string
  extraCurricularActivity: string
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

const mockStudents: Student[] = [
  {
    admNo: 'ADM-2022-0412',
    name: 'Aarav Sharma',
    grade: 'Grade 10-A',
    gradeNumber: 10,
    parent: 'Devendra Sharma',
    contact: '+91 98765 43210',
    feeStatus: 'paid',
    enrollmentDate: '12 Jun 2022',
    attendance: 94.8,
    session: '2024-2025',
    status: 'Active Student',
    feeOverallStatus: 'Clear',
    prescribedFee: '₹50,000',
    totalPaid: '₹37,500',
    collectedPercent: 75,
    remaining: '₹12,500',
    nextDue: 'Jan 2025',
    father: 'Devendra Sharma',
    fatherOccupation: 'Software Engineer',
    mother: 'Kiran Sharma',
    motherOccupation: 'Homemaker',
    email: 'dsharma@gmail.com',
    address: 'Flat 402, Block C, Royal Palm Apartments, Sector 15, Dwarka, New Delhi - 110075',
    bloodGroup: 'O-Positive',
    allergies: 'None Reported',
    schoolUdise: '07100108907',
    admissionDate: '12-04-2022',
    section: 'B',
    rollNo: '24',
    studentStream: 'Not Applicable',
    comingFrom: 'Aadhunik Public School',
    gender: 'Male',
    dob: '18-03-2010',
    motherTongue: 'Hindi',
    socialCategory: 'General',
    minorityGroup: 'No',
    outOfSchoolChild: 'No',
    indianNational: 'Yes',
    aadhaarNo: 'XXXX XXXX 4821',
    nameAsPerAadhaar: 'Aarav Sharma',
    guardianName: '—',
    alternateMobile: '—',
    pincode: '110075',
    bplBeneficiary: 'No',
    antyodayaBeneficiary: 'No',
    ewsDisadvantaged: 'No',
    cwsn: 'No',
    impairmentDetails: 'Not applicable',
    previousSchoolingStatus: 'Studied in School',
    previousClass: 'Grade 9',
    admittedUnder: 'General',
    appearedForExam: 'Yes',
    previousExamResult: 'Pass',
    previousMarksPercent: '88%',
    previousDaysAttended: '212',
    scholarshipType: 'None',
    scholarshipName: '—',
    scholarshipAmount: '—',
    freeUniform: 'Yes',
    freeTextbooks: 'Yes — Code TB-2024-10B',
    extraCurricularActivity: 'Robotics Club',
  },
  {
    admNo: 'ADM-2021-0892',
    name: 'Priya Patel',
    grade: 'Grade 12-B',
    gradeNumber: 12,
    parent: 'Ramesh Patel',
    contact: '+91 98123 45678',
    feeStatus: 'paid',
    enrollmentDate: '05 Apr 2021',
    attendance: 97.2,
    session: '2024-2025',
    status: 'Active Student',
    feeOverallStatus: 'Clear',
    prescribedFee: '₹55,000',
    totalPaid: '₹55,000',
    collectedPercent: 100,
    remaining: '₹0',
    nextDue: '-',
    father: 'Ramesh Patel',
    fatherOccupation: 'Business Owner',
    mother: 'Anita Patel',
    motherOccupation: 'Homemaker',
    email: 'rpatel@gmail.com',
    address: '25, Lodi Colony, New Delhi - 110003',
    bloodGroup: 'B-Positive',
    allergies: 'None Reported',
    schoolUdise: '07100108907',
    admissionDate: '05-04-2021',
    section: 'A',
    rollNo: '12',
    studentStream: 'Science',
    comingFrom: 'Previous School',
    gender: 'Female',
    dob: '15-09-2004',
    motherTongue: 'Gujarati',
    socialCategory: 'General',
    minorityGroup: 'No',
    outOfSchoolChild: 'No',
    indianNational: 'Yes',
    aadhaarNo: 'XXXX XXXX 1234',
    nameAsPerAadhaar: 'Priya Patel',
    guardianName: '—',
    alternateMobile: '—',
    pincode: '110003',
    bplBeneficiary: 'No',
    antyodayaBeneficiary: 'No',
    ewsDisadvantaged: 'No',
    cwsn: 'No',
    impairmentDetails: 'Not applicable',
    previousSchoolingStatus: 'Studied in School',
    previousClass: 'Grade 11',
    admittedUnder: 'General',
    appearedForExam: 'Yes',
    previousExamResult: 'Pass',
    previousMarksPercent: '92%',
    previousDaysAttended: '200',
    scholarshipType: 'None',
    scholarshipName: '—',
    scholarshipAmount: '—',
    freeUniform: 'Yes',
    freeTextbooks: 'Yes — Code TB-2023-12B',
    extraCurricularActivity: 'Dance Club',
  },
  {
    admNo: 'ADM-2023-0104',
    name: 'Vikram Malhotra',
    grade: 'Grade 8-C',
    gradeNumber: 8,
    parent: 'Sanjay Malhotra',
    contact: '+91 95432 10987',
    feeStatus: 'overdue',
    enrollmentDate: '10 Jan 2023',
    attendance: 88.5,
    session: '2024-2025',
    status: 'Active Student',
    feeOverallStatus: 'Overdue',
    prescribedFee: '₹45,000',
    totalPaid: '₹30,000',
    collectedPercent: 66,
    remaining: '₹15,000',
    nextDue: 'Dec 2024',
    father: 'Sanjay Malhotra',
    fatherOccupation: 'Chartered Accountant',
    mother: 'Ritu Malhotra',
    motherOccupation: 'Doctor',
    email: 'smalhotra@gmail.com',
    address: 'B-12, Hauz Khas, New Delhi - 110016',
    bloodGroup: 'A-Positive',
    allergies: 'Penicillin',
    schoolUdise: '07100108907',
    admissionDate: '10-01-2023',
    section: 'C',
    rollNo: '34',
    studentStream: 'Not Applicable',
    comingFrom: 'New Admission',
    gender: 'Male',
    dob: '22-07-2012',
    motherTongue: 'Hindi',
    socialCategory: 'General',
    minorityGroup: 'No',
    outOfSchoolChild: 'No',
    indianNational: 'Yes',
    aadhaarNo: 'XXXX XXXX 5678',
    nameAsPerAadhaar: 'Vikram Malhotra',
    guardianName: '—',
    alternateMobile: '—',
    pincode: '110016',
    bplBeneficiary: 'No',
    antyodayaBeneficiary: 'No',
    ewsDisadvantaged: 'No',
    cwsn: 'No',
    impairmentDetails: 'Not applicable',
    previousSchoolingStatus: 'Studied in School',
    previousClass: 'Grade 7',
    admittedUnder: 'General',
    appearedForExam: 'Yes',
    previousExamResult: 'Pass',
    previousMarksPercent: '85%',
    previousDaysAttended: '210',
    scholarshipType: 'None',
    scholarshipName: '—',
    scholarshipAmount: '—',
    freeUniform: 'Yes',
    freeTextbooks: 'Yes — Code TB-2024-08C',
    extraCurricularActivity: 'Cricket',
  },
  {
    admNo: 'ADM-2022-0941',
    name: 'Ananya Iyer',
    grade: 'Grade 11-A',
    gradeNumber: 11,
    parent: 'Karthik Iyer',
    contact: '+91 94456 78901',
    feeStatus: 'paid',
    enrollmentDate: '15 Aug 2022',
    attendance: 96.1,
    session: '2024-2025',
    status: 'Active Student',
    feeOverallStatus: 'Clear',
    prescribedFee: '₹52,000',
    totalPaid: '₹52,000',
    collectedPercent: 100,
    remaining: '₹0',
    nextDue: '-',
    father: 'Karthik Iyer',
    fatherOccupation: 'IT Manager',
    mother: 'Lakshmi Iyer',
    motherOccupation: 'College Professor',
    email: 'kiyer@gmail.com',
    address: 'C-56, Anand Niketan, New Delhi - 110021',
    bloodGroup: 'AB-Positive',
    allergies: 'None Reported',
    schoolUdise: '07100108907',
    admissionDate: '15-08-2022',
    section: 'A',
    rollNo: '05',
    studentStream: 'Commerce',
    comingFrom: 'Previous School',
    gender: 'Female',
    dob: '12-05-2005',
    motherTongue: 'Tamil',
    socialCategory: 'General',
    minorityGroup: 'No',
    outOfSchoolChild: 'No',
    indianNational: 'Yes',
    aadhaarNo: 'XXXX XXXX 9012',
    nameAsPerAadhaar: 'Ananya Iyer',
    guardianName: '—',
    alternateMobile: '—',
    pincode: '110021',
    bplBeneficiary: 'No',
    antyodayaBeneficiary: 'No',
    ewsDisadvantaged: 'No',
    cwsn: 'No',
    impairmentDetails: 'Not applicable',
    previousSchoolingStatus: 'Studied in School',
    previousClass: 'Grade 10',
    admittedUnder: 'General',
    appearedForExam: 'Yes',
    previousExamResult: 'Pass',
    previousMarksPercent: '95%',
    previousDaysAttended: '215',
    scholarshipType: 'None',
    scholarshipName: '—',
    scholarshipAmount: '—',
    freeUniform: 'Yes',
    freeTextbooks: 'Yes — Code TB-2024-11A',
    extraCurricularActivity: 'Music Club',
  },
  {
    admNo: 'ADM-2024-0015',
    name: 'Rohan Roy',
    grade: 'Grade 9-B',
    gradeNumber: 9,
    parent: 'Siddharth Roy',
    contact: '+91 91234 56789',
    feeStatus: 'overdue',
    enrollmentDate: '02 Jun 2024',
    attendance: 91.3,
    session: '2024-2025',
    status: 'Active Student',
    feeOverallStatus: 'Overdue',
    prescribedFee: '₹48,000',
    totalPaid: '₹24,000',
    collectedPercent: 50,
    remaining: '₹24,000',
    nextDue: 'Nov 2024',
    father: 'Siddharth Roy',
    fatherOccupation: 'Pilot',
    mother: 'Pooja Roy',
    motherOccupation: 'Fashion Designer',
    email: 'sroy@gmail.com',
    address: 'A-101, Vasant Kunj, New Delhi - 110070',
    bloodGroup: 'O-Negative',
    allergies: 'Dust',
    schoolUdise: '07100108907',
    admissionDate: '02-06-2024',
    section: 'B',
    rollNo: '45',
    studentStream: 'Not Applicable',
    comingFrom: 'New Admission',
    gender: 'Male',
    dob: '05-11-2011',
    motherTongue: 'Bengali',
    socialCategory: 'OBC',
    minorityGroup: 'No',
    outOfSchoolChild: 'No',
    indianNational: 'Yes',
    aadhaarNo: 'XXXX XXXX 3456',
    nameAsPerAadhaar: 'Rohan Roy',
    guardianName: '—',
    alternateMobile: '—',
    pincode: '110070',
    bplBeneficiary: 'No',
    antyodayaBeneficiary: 'No',
    ewsDisadvantaged: 'No',
    cwsn: 'No',
    impairmentDetails: 'Not applicable',
    previousSchoolingStatus: 'New Admission',
    previousClass: '—',
    admittedUnder: 'General',
    appearedForExam: 'No',
    previousExamResult: '—',
    previousMarksPercent: '—',
    previousDaysAttended: '—',
    scholarshipType: 'None',
    scholarshipName: '—',
    scholarshipAmount: '—',
    freeUniform: 'Pending',
    freeTextbooks: 'Pending',
    extraCurricularActivity: '—',
  },
]

const mockTransactions: FeeTransaction[] = [
  {
    receiptId: 'REC-2024-0982',
    head: 'Term 2 Tuition Fee',
    date: '14 Nov 2024',
    method: 'UPI (GPay)',
    amount: '₹12,500',
  },
  {
    receiptId: 'REC-2024-0451',
    head: 'Term 1 Tuition Fee',
    date: '10 Aug 2024',
    method: 'Net Banking',
    amount: '₹12,500',
  },
  {
    receiptId: 'REC-2024-0102',
    head: 'Annual Registration & Labs',
    date: '15 Jun 2024',
    method: 'Credit Card',
    amount: '₹12,500',
  },
]

export async function getStudents(params: StudentsQueryParams): Promise<StudentsResponse> {
  await new Promise(resolve => setTimeout(resolve, 300))

  let filtered = [...mockStudents]

  if (params.search) {
    const query = params.search.toLowerCase()
    filtered = filtered.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.admNo.toLowerCase().includes(query),
    )
  }

  if (params.grade && params.grade !== 'All Grades') {
    filtered = filtered.filter((student) => student.grade === params.grade)
  }

  if (params.status && params.status !== 'all') {
    filtered = filtered.filter((student) => student.feeStatus === params.status)
  }

  const start = (params.page - 1) * params.pageSize
  const end = start + params.pageSize
  const paginated = filtered.slice(start, end)

  return {
    students: paginated,
    total: filtered.length,
    page: params.page,
    pageSize: params.pageSize,
  }
}

export async function getStudentProfile(admNo: string): Promise<StudentProfile | null> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const student = mockStudents.find((s) => s.admNo === admNo)
  if (!student) return null
  return {
    student,
    transactions: mockTransactions,
  }
}

export async function getPersonalDetails(admNo: string): Promise<Student | null> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockStudents.find((s) => s.admNo === admNo) ?? null
}
