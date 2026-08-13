import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import {
  User,
  ArrowLeft,
  Edit3,
  CreditCard,
  Search,
  Bell,
  Download,
} from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { getStudentProfile } from '@/services/student.service'
import type { StudentProfile } from '@/services/student.service'

function useStudentProfile(admNo: string) {
  return useQuery<StudentProfile | null>({
    queryKey: ['studentProfile', admNo],
    queryFn: () => getStudentProfile(admNo),
    enabled: !!admNo,
  })
}

const tabs = [
  { id: 'fee-history', label: 'Fee History & Billing' },
  { id: 'personal-details', label: 'Personal Details' },
  { id: 'academic-performance', label: 'Academic Performance' },
  { id: 'attendance-log', label: 'Attendance Log' },
] as const

export default function StudentProfile() {
  const { admNo } = useParams<{ admNo: string }>()
  const profileQuery = useStudentProfile(admNo ?? '')
  const [activeTab, setActiveTab] = useState('fee-history')

  if (profileQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-sm text-slate-500">Loading student profile...</div>
      </div>
    )
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-sm text-red-600">Student not found.</div>
      </div>
    )
  }

  const { student, transactions } = profileQuery.data

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
              <Link
                to={`/students/${admNo}/edit-profile`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
              >
                <Edit3 className="h-4 w-4 text-slate-500" />
                Edit Profile
              </Link>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors">
                <CreditCard className="h-4 w-4" />
                Collect Fee
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
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
                        <span>Grade: <span className="font-semibold text-slate-700">{student.grade.replace(/^Grade\s*/i, '')}</span></span>
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

              {/* Tabs */}
              <div className="border-b border-slate-200">
              <nav className="-mb-px flex gap-6">
                {tabs.map((tab) => (
                  tab.id === 'personal-details' ? (
                    <Link
                      key={tab.id}
                      to={`/students/${admNo}/personal-details`}
                      className="pb-3 text-sm font-semibold transition-colors border-b-2 border-transparent text-slate-500 hover:text-slate-900"
                    >
                      {tab.label}
                    </Link>
                  ) : (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === tab.id
                          ? 'border-b-2 border-[#4F46E5] text-[#4F46E5]'
                          : 'border-b-2 border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                ))}
              </nav>
              </div>

              {activeTab === 'fee-history' && (
                <div className="space-y-6">
                  {/* Fee Structure Breakdown */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
                    <h2 className="text-base font-bold text-slate-900">Fee Structure Breakdown (Annual)</h2>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-5">
                        <p className="text-xs font-semibold text-slate-400">Total Prescribed Fee</p>
                        <p className="mt-2 text-xl font-bold text-slate-900">{student.prescribedFee}</p>
                        <p className="mt-1 text-[11px] text-slate-400">For Academic Year {student.session}</p>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-5">
                        <p className="text-xs font-semibold text-slate-400">Total Paid Amount</p>
                        <p className="mt-2 text-xl font-bold text-slate-900">{student.totalPaid}</p>
                        <p className="mt-1 text-[11px] font-semibold text-emerald-600">{student.collectedPercent}% Collected</p>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-5">
                        <p className="text-xs font-semibold text-slate-400">Remaining Balance</p>
                        <p className="mt-2 text-xl font-bold text-slate-900">{student.remaining}</p>
                        <p className="mt-1 text-[11px] text-slate-400">Due date: {student.nextDue}</p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Log */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-base font-bold text-slate-900">Transaction & Receipt Log</h2>
                      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors">
                        <Download className="h-3.5 w-3.5 text-slate-500" />
                        Export Ledger
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
                            <th className="pb-3 px-3 font-semibold">Receipt ID</th>
                            <th className="pb-3 px-3 font-semibold">Fee Head</th>
                            <th className="pb-3 px-3 font-semibold">Payment Date</th>
                            <th className="pb-3 px-3 font-semibold">Payment Method</th>
                            <th className="pb-3 px-3 font-semibold">Amount</th>
                            <th className="pb-3 px-3 font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {transactions.map((txn) => (
                            <tr key={txn.receiptId} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-3 text-xs font-medium text-slate-600">{txn.receiptId}</td>
                              <td className="py-4 px-3 text-xs font-bold text-slate-900">{txn.head}</td>
                              <td className="py-4 px-3 text-xs text-slate-500">{txn.date}</td>
                              <td className="py-4 px-3 text-xs text-slate-600">{txn.method}</td>
                              <td className="py-4 px-3 text-xs font-bold text-slate-900">{txn.amount}</td>
                              <td className="py-4 px-3">
                                <button className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors">
                                  View Receipt
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'personal-details' && (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs space-y-4">
                  <h2 className="text-base font-bold text-slate-900">Personal Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" value={student.name} />
                    <Field label="Admission No" value={student.admNo} />
                    <Field label="Grade" value={student.grade} />
                    <Field label="Session" value={student.session} />
                    <Field label="Enrollment Date" value={student.enrollmentDate} />
                    <Field label="Contact Number" value={student.contact} />
                    <Field label="Email" value={student.email} />
                    <Field label="Address" value={student.address} fullWidth />
                  </div>
                </div>
              )}

              {activeTab === 'academic-performance' && (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs space-y-4">
                  <h2 className="text-base font-bold text-slate-900">Academic Performance</h2>
                  <p className="text-sm text-slate-500">Academic records and grades for {student.name}.</p>
                </div>
              )}

              {activeTab === 'attendance-log' && (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs space-y-4">
                  <h2 className="text-base font-bold text-slate-900">Attendance Log</h2>
                  <p className="text-sm text-slate-500">Daily and term-wise attendance records.</p>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Guardian Details */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-5">Guardian Details</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Father's Name</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{student.father}</p>
                    <p className="mt-0.5 text-xs text-slate-500">Occupation: {student.fatherOccupation}</p>
                  </div>
                  <div className="border-t border-slate-100 pt-5">
                    <p className="text-xs font-semibold text-slate-400">Mother's Name</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{student.mother}</p>
                    <p className="mt-0.5 text-xs text-slate-500">Occupation: {student.motherOccupation}</p>
                  </div>
                  <div className="border-t border-slate-100 pt-5 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-400">Primary Contact</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{student.contact}</p>
                      <p className="mt-0.5 text-xs text-slate-500">Email: {student.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400">Residential Address</p>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{student.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical & Emergency */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-5">Medical & Emergency</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Blood Group</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                      <svg className="h-3.5 w-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {student.bloodGroup}
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-xs font-semibold text-slate-400">Allergies</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{student.allergies}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Field({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  )
}
