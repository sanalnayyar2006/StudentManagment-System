import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  X,
  Search,
  Bell,
} from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { addStudent } from '@/services/student.service'
import type { Student } from '@/services/student.service'

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

function InputField({ label, value, onChange, required, placeholder, fullWidth }: { label: string; value: string; onChange: (val: string) => void; required?: boolean; placeholder?: string; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />
    </div>
  )
}

function DateField({ label, value, onChange, required }: { label: string; value: string; onChange: (val: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="DD-MM-YYYY"
        className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options, required }: { label: string; value: string; onChange: (val: string) => void; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

function YesNoField({ label, value, onChange, required }: { label: string; value: string; onChange: (val: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange('Yes')}
          className={`h-9 rounded-lg px-4 text-xs font-bold transition-colors ${value === 'Yes' ? 'bg-[#4F46E5] text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange('No')}
          className={`h-9 rounded-lg px-4 text-xs font-bold transition-colors ${value === 'No' ? 'bg-[#4F46E5] text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          No
        </button>
      </div>
    </div>
  )
}

const emptyStudent: Omit<Student, 'admNo'> = {
  name: '',
  firstName: '',
  lastName: '',
  grade: '',
  gradeNumber: 0,
  parent: '',
  contact: '',
  feeStatus: 'paid',
  enrollmentDate: '',
  attendance: 0,
  session: '',
  status: 'Active Student',
  feeOverallStatus: 'Clear',
  prescribedFee: '',
  totalPaid: '',
  collectedPercent: 0,
  remaining: '',
  nextDue: '',
  father: '',
  fatherOccupation: '',
  mother: '',
  motherOccupation: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  photo: '',
  bloodGroup: '',
  allergies: '',
  schoolUdise: '',
  admissionDate: '',
  section: '',
  rollNo: '',
  studentStream: '',
  academicYear: '',
  className: '',
  stream: '',
  comingFrom: '',
  gender: '',
  dob: '',
  motherTongue: '',
  socialCategory: '',
  minorityGroup: '',
  outOfSchoolChild: '',
  indianNational: '',
  nationality: '',
  aadhaarNo: '',
  aadhaarNumber: '',
  nameAsPerAadhaar: '',
  guardianName: '',
  alternateMobile: '',
  bplBeneficiary: '',
  antyodayaBeneficiary: '',
  ewsDisadvantaged: '',
  disadvantagedGroup: '',
  cwsn: '',
  impairmentDetails: '',
  disabilityDetails: '',
  previousSchoolingStatus: '',
  previousClass: '',
  admittedUnder: '',
  previousSchool: '',
  enrolledUnder: '',
  appearedForExam: '',
  appearedPreviousExam: '',
  previousExamResult: '',
  result: '',
  previousMarksPercent: '',
  marks: '',
  previousDaysAttended: '',
  daysAttended: '',
  scholarshipType: '',
  scholarshipName: '',
  scholarshipAmount: '',
  amount: '',
  freeUniform: '',
  freeTextbooks: '',
  extraCurricularActivity: '',
  extraCurricular: '',
  facilityProvidedToCSWN: '',
  specificLearningDisability: '',
  typeofSpecificLearningDisability: '',
  autismSpectrumDisorder: '',
  attentionDeficitHyperactiveDisorder: '',
}

export default function AddStudent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form, setForm] = useState<Omit<Student, 'admNo'>>(() => ({ ...emptyStudent }))

  const saveMutation = useMutation({
    mutationFn: () => addStudent(form),
    onSuccess: (newStudent) => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['studentProfile', newStudent.admNo] })
      navigate(`/students/${newStudent.admNo}`)
    },
  })

  const updateField = <K extends keyof Omit<Student, 'admNo'>>(key: K, value: Omit<Student, 'admNo'>[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'firstName' || key === 'lastName') {
        next.name = `${next.firstName} ${next.lastName}`.trim()
      }
      return next
    })
  }

  const handleCancel = () => {
    navigate('/students')
  }

  const handleSave = () => {
    saveMutation.mutate()
  }

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
              to="/students"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Students Directory
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
              >
                <X className="h-4 w-4 text-slate-500" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                Add Student
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Personal Details</h1>
            <p className="mt-1 text-xs text-slate-500">
              Update student required information in the MMPS system. All fields marked with * are required.
            </p>
          </div>

          <div className="space-y-6">
            <Section number={1} title="Academic Information">
              <InputField label="UDISE Code of School" value={form.schoolUdise} onChange={(val) => updateField('schoolUdise', val)} />
              <InputField label="Admission Number" value="" onChange={() => {}} required />
              <DateField label="Admission Date" value={form.admissionDate} onChange={(val) => updateField('admissionDate', val)} required />
              <SelectField label="Grade / Class" value={form.grade} onChange={(val) => updateField('grade', val)} options={['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']} required />
              <InputField label="Section" value={form.section} onChange={(val) => updateField('section', val)} required />
              <InputField label="Roll No." value={form.rollNo} onChange={(val) => updateField('rollNo', val)} required />
              <InputField label="Student Stream" value={form.studentStream} onChange={(val) => updateField('studentStream', val)} />
              <InputField label="Coming From (Previous School)" value={form.comingFrom} onChange={(val) => updateField('comingFrom', val)} />
              <InputField label="Academic Year" value={form.academicYear} onChange={(val) => updateField('academicYear', val)} required />
              <SelectField label="Status" value={form.status} onChange={(val) => updateField('status', val as 'Active Student')} options={['Active Student']} required />
            </Section>

            <Section number={2} title="Personal Information">
              <InputField label="First Name *" value={form.firstName} onChange={(val) => updateField('firstName', val)} required />
              <InputField label="Last Name *" value={form.lastName} onChange={(val) => updateField('lastName', val)} required />
              <DateField label="Date of Birth *" value={form.dob} onChange={(val) => updateField('dob', val)} required />
              <InputField label="Blood Group" value={form.bloodGroup} onChange={(val) => updateField('bloodGroup', val)} />
              <InputField label="Mother Tongue" value={form.motherTongue} onChange={(val) => updateField('motherTongue', val)} />
              <SelectField label="Social Category" value={form.socialCategory} onChange={(val) => updateField('socialCategory', val)} options={['General', 'SC', 'ST', 'OBC']} />
              <InputField label="Minority Group" value={form.minorityGroup} onChange={(val) => updateField('minorityGroup', val)} />
              <YesNoField label="Child is Out-of-School Child" value={form.outOfSchoolChild} onChange={(val) => updateField('outOfSchoolChild', val)} />
              <YesNoField label="Child is Indian National" value={form.indianNational} onChange={(val) => updateField('indianNational', val)} required />
              <InputField label="City" value={form.city} onChange={(val) => updateField('city', val)} required />
              <InputField label="State" value={form.state} onChange={(val) => updateField('state', val)} required />
              <InputField label="Photo URL" value={form.photo} onChange={(val) => updateField('photo', val)} />
            </Section>

            <Section number={3} title="Identity Documents">
              <InputField label="Aadhaar No. of Child" value={form.aadhaarNo} onChange={(val) => updateField('aadhaarNo', val)} />
              <InputField label="Name as per Aadhaar" value={form.nameAsPerAadhaar} onChange={(val) => updateField('nameAsPerAadhaar', val)} />
              <SelectField label="Nationality" value={form.nationality} onChange={(val) => updateField('nationality', val)} options={['Indian', 'NRI', 'Foreign National']} required />
              <SelectField label="Disadvantaged Group" value={form.disadvantagedGroup} onChange={(val) => updateField('disadvantagedGroup', val)} options={['General', 'SC', 'ST', 'OBC', 'EWS']} />
            </Section>

            <Section number={4} title="Guardian & Contact Details">
              <InputField label="Father's Full Name" value={form.father} onChange={(val) => updateField('father', val)} required />
              <InputField label="Mother's Full Name" value={form.mother} onChange={(val) => updateField('mother', val)} required />
              <InputField label="Guardian's Name (optional)" value={form.guardianName} onChange={(val) => updateField('guardianName', val)} />
              <InputField label="Primary Mobile Number" value={form.contact} onChange={(val) => updateField('contact', val)} required />
              <InputField label="Alternate Mobile Number" value={form.alternateMobile} onChange={(val) => updateField('alternateMobile', val)} />
              <InputField label="Email ID" value={form.email} onChange={(val) => updateField('email', val)} required />
              <InputField label="Pincode" value={form.pincode} onChange={(val) => updateField('pincode', val)} required />
              <InputField label="City" value={form.city} onChange={(val) => updateField('city', val)} required />
              <InputField label="State" value={form.state} onChange={(val) => updateField('state', val)} required />
              <InputField label="Residential Address" value={form.address} onChange={(val) => updateField('address', val)} required fullWidth />
            </Section>

            <Section number={5} title="Social Welfare & Category Status">
              <YesNoField label="BPL Beneficiary" value={form.bplBeneficiary} onChange={(val) => updateField('bplBeneficiary', val)} />
              <YesNoField label="Antyodaya Beneficiary" value={form.antyodayaBeneficiary} onChange={(val) => updateField('antyodayaBeneficiary', val)} />
              <YesNoField label="Belongs to EWS / Disadvantaged Group" value={form.ewsDisadvantaged} onChange={(val) => updateField('ewsDisadvantaged', val)} />
            </Section>

            <Section number={6} title="CWSN Details">
              <YesNoField label="CWSN (Child With Special Needs)" value={form.cwsn} onChange={(val) => updateField('cwsn', val)} required />
              <InputField label="Impairment / Disability Details" value={form.impairmentDetails} onChange={(val) => updateField('impairmentDetails', val)} />
              <InputField label="Facility Provided to CSWN" value={form.facilityProvidedToCSWN} onChange={(val) => updateField('facilityProvidedToCSWN', val)} />
              <YesNoField label="Specific Learning Disability" value={form.specificLearningDisability} onChange={(val) => updateField('specificLearningDisability', val)} />
              <InputField label="Type of Specific Learning Disability" value={form.typeofSpecificLearningDisability} onChange={(val) => updateField('typeofSpecificLearningDisability', val)} />
              <YesNoField label="Autism Spectrum Disorder" value={form.autismSpectrumDisorder} onChange={(val) => updateField('autismSpectrumDisorder', val)} />
              <YesNoField label="Attention Deficit Hyperactive Disorder" value={form.attentionDeficitHyperactiveDisorder} onChange={(val) => updateField('attentionDeficitHyperactiveDisorder', val)} />
            </Section>

            <Section number={7} title="Previous Academic Record">
              <SelectField label="Previous Schooling Status" value={form.previousSchoolingStatus} onChange={(val) => updateField('previousSchoolingStatus', val)} options={['Studied in School', 'New Admission']} />
              <InputField label="Class Studied Previously" value={form.previousClass} onChange={(val) => updateField('previousClass', val)} />
              <InputField label="Admitted / Enrolled Under" value={form.admittedUnder} onChange={(val) => updateField('admittedUnder', val)} />
              <YesNoField label="Appeared for Previous Exam" value={form.appearedForExam} onChange={(val) => updateField('appearedForExam', val)} />
              <SelectField label="Result of Previous Exam" value={form.previousExamResult} onChange={(val) => updateField('previousExamResult', val)} options={['Pass', 'Fail']} />
              <InputField label="Marks % of Previous Exam" value={form.previousMarksPercent} onChange={(val) => updateField('previousMarksPercent', val)} />
              <InputField label="Days Attended (Previous Class)" value={form.previousDaysAttended} onChange={(val) => updateField('previousDaysAttended', val)} />
            </Section>

            <Section number={8} title="Scholarship Details">
              <SelectField label="Scholarship Type" value={form.scholarshipType} onChange={(val) => updateField('scholarshipType', val)} options={['None', 'Merit', 'Need-Based']} />
              <InputField label="Name of Scholarship" value={form.scholarshipName} onChange={(val) => updateField('scholarshipName', val)} />
              <InputField label="Scholarship Amount" value={form.scholarshipAmount} onChange={(val) => updateField('scholarshipAmount', val)} />
            </Section>

            <Section number={9} title="Facilities Provided">
              <InputField label="Free Uniform" value={form.freeUniform} onChange={(val) => updateField('freeUniform', val)} />
              <InputField label="Free Textbooks (code only)" value={form.freeTextbooks} onChange={(val) => updateField('freeTextbooks', val)} />
              <InputField label="Extra-Curricular Activity" value={form.extraCurricularActivity} onChange={(val) => updateField('extraCurricularActivity', val)} />
            </Section>
          </div>
        </main>
      </div>
    </div>
  )
}
