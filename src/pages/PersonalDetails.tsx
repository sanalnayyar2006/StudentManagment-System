import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import {
  User,
  ArrowLeft,
  Edit3,
  CreditCard,
  Search,
  Bell,
} from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { getPersonalDetails } from '@/services/student.service'
import type { Student } from '@/services/student.service'

function usePersonalDetails(admNo: string) {
  return useQuery<Student | null>({
    queryKey: ['personalDetails', admNo],
    queryFn: () => getPersonalDetails(admNo),
    enabled: !!admNo,
  })
}

function Section({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
          <span className="text-sm font-bold">{number}</span>
        </div>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {children}
      </div>
    </div>
  )
}

function Field({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  )
}

export default function PersonalDetails() {
  const { admNo } = useParams<{ admNo: string }>()
  const detailsQuery = usePersonalDetails(admNo ?? '')

  if (detailsQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-sm text-slate-500">Loading personal details...</div>
      </div>
    )
  }

  if (detailsQuery.isError || !detailsQuery.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-sm text-red-600">Student not found.</div>
      </div>
    )
  }

  const student = detailsQuery.data

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activeHref="/students" />

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-20 items-center justify-between px-8 bg-[#F8FAFC]">
          <div className="relative w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search students, receipts, staff or files..."
              className="h-10 w-full rounded-full bg-[#F1F5F9] pl-10 pr-4 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-[#F1F5F9] px-4 py-2 text-xs font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span>Academic Term: 2024-25</span>
            </div>

            <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors">
              <Bell className="h-4 w-4 text-slate-600" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 pb-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link
              to={`/students/${admNo}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Student Profile
            </Link>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors">
                <Edit3 className="h-4 w-4 text-slate-500" />
                Edit Profile
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors">
                <CreditCard className="h-4 w-4" />
                Collect Fee
              </button>
            </div>
          </div>

          {/* Student Info Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <User className="h-10 w-10" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    {student.name}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {student.status}
                    </span>
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span>Admission No: <span className="font-semibold text-slate-700">{student.admNo}</span></span>
                    <span>Grade: <span className="font-semibold text-slate-700">{student.gradeNumber}</span></span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Session: <span className="font-semibold text-slate-700">{student.session}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-8">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Attendance (Term)</p>
                  <p className="text-3xl font-bold text-slate-900">{student.attendance}%</p>
                  <p className="text-xs font-semibold text-emerald-600">Excellent Standing</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fee Status</p>
                  <p className="text-lg font-bold text-emerald-600">{student.feeOverallStatus}</p>
                  <p className="text-xs text-slate-500">Next due: {student.nextDue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Section number={1} title="Academic Information">
              <Field label="UDISE Code of School" value={student.schoolUdise} />
              <Field label="Admission Number" value={student.admNo} />
              <Field label="Admission Date" value={student.admissionDate} />
              <Field label="Grade / Class" value={student.grade} />
              <Field label="Section" value={student.section} />
              <Field label="Roll No." value={student.rollNo} />
              <Field label="Student Stream" value={student.studentStream} />
              <Field label="Coming From (Previous School)" value={student.comingFrom} />
            </Section>

            <Section number={2} title="Personal Information">
              <Field label="Name of Student" value={student.name} />
              <Field label="Gender" value={student.gender} />
              <Field label="Date of Birth" value={student.dob} />
              <Field label="Mother Tongue" value={student.motherTongue} />
              <Field label="Social Category" value={student.socialCategory} />
              <Field label="Minority Group" value={student.minorityGroup} />
              <Field label="Child is Out-of-School Child" value={student.outOfSchoolChild} />
              <Field label="Child is Indian National" value={student.indianNational} />
            </Section>

            <Section number={3} title="Identity Documents">
              <Field label="Aadhaar No. of Child" value={student.aadhaarNo} />
              <Field label="Name as per Aadhaar" value={student.nameAsPerAadhaar} />
            </Section>

            <Section number={4} title="Guardian & Contact Details">
              <Field label="Father's Name" value={student.father} />
              <Field label="Mother's Name" value={student.mother} />
              <Field label="Guardian's Name" value={student.guardianName} />
              <Field label="Primary Mobile Number" value={student.contact} />
              <Field label="Alternate Mobile Number" value={student.alternateMobile} />
              <Field label="Email ID" value={student.email} />
              <Field label="Pincode" value={student.pincode} />
              <Field label="Residential Address" value={student.address} fullWidth />
            </Section>

            <Section number={5} title="Social Welfare & Category Status">
              <Field label="BPL Beneficiary" value={student.bplBeneficiary} />
              <Field label="Antyodaya Beneficiary" value={student.antyodayaBeneficiary} />
              <Field label="Belongs to EWS / Disadvantaged Group" value={student.ewsDisadvantaged} />
            </Section>

            <Section number={6} title="CWSN Details">
              <Field label="CWSN (Child With Special Needs)" value={student.cwsn} />
              <Field label="Impairment / Disability Details" value={student.impairmentDetails} />
            </Section>

            <Section number={7} title="Previous Academic Record">
              <Field label="Previous Schooling Status" value={student.previousSchoolingStatus} />
              <Field label="Class Studied Previously" value={student.previousClass} />
              <Field label="Admitted / Enrolled Under" value={student.admittedUnder} />
              <Field label="Appeared for Previous Exam" value={student.appearedForExam} />
              <Field label="Result of Previous Exam" value={student.previousExamResult} />
              <Field label="Marks % of Previous Exam" value={student.previousMarksPercent} />
              <Field label="Days Attended (Previous Class)" value={student.previousDaysAttended} />
            </Section>

            <Section number={8} title="Scholarship Details">
              <Field label="Scholarship Type" value={student.scholarshipType} />
              <Field label="Name of Scholarship" value={student.scholarshipName} />
              <Field label="Scholarship Amount" value={student.scholarshipAmount} />
            </Section>

            <Section number={9} title="Facilities Provided">
              <Field label="Free Uniform" value={student.freeUniform} />
              <Field label="Free Textbooks" value={student.freeTextbooks} />
              <Field label="Extra-Curricular Activity" value={student.extraCurricularActivity} />
            </Section>
          </div>
        </main>
      </div>
    </div>
  )
}
