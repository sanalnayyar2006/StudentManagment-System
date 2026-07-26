import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  User,
  Eye,
  CreditCard,
  Trash2,
  Search,
  Plus,
  Filter,
  RefreshCw,
  Bell,
} from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { getStudents } from '@/services/student.service'

const pageSize = 5

export default function Students() {
  const [searchText, setSearchText] = useState('')
  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState('All Grades')
  const [status, setStatus] = useState<'all' | 'paid' | 'overdue'>('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchText), 300)
    return () => clearTimeout(timer)
  }, [searchText])

  useEffect(() => {
    setPage(1)
  }, [search, grade, status])

  const studentsQuery = useQuery({
    queryKey: ['students', { page, search, grade, status }] as const,
    queryFn: () => getStudents({ page, pageSize, search, grade, status }),
  })

  const handleReset = () => {
    setSearchText('')
    setSearch('')
    setGrade('All Grades')
    setStatus('all')
    setPage(1)
  }

  const totalPages = studentsQuery.data
    ? Math.ceil(studentsQuery.data.total / pageSize)
    : 0

  const start = studentsQuery.data ? (studentsQuery.data.page - 1) * studentsQuery.data.pageSize + 1 : 0
  const end = studentsQuery.data
    ? Math.min(studentsQuery.data.page * pageSize, studentsQuery.data.total)
    : 0

  const total = studentsQuery.data?.total ?? 0

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
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Students Directory
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage student profiles, academic status, fee records, and registration details.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors">
              <Plus className="h-4 w-4" />
              Add New Student
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search by name, adm ID..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-10 w-full rounded-full bg-[#F1F5F9] pl-10 pr-4 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="h-10 rounded-full bg-[#F1F5F9] px-4 text-xs font-medium text-slate-700 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option>All Grades</option>
              {Array.from(new Set([
                'Grade 10-A',
                'Grade 12-B',
                'Grade 8-C',
                'Grade 11-A',
                'Grade 9-B',
                'Grade 10-B',
                'Grade 9-A',
                'Grade 12-A',
                'Grade 1-A',
                'Grade 11-B',
              ])).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'all' | 'paid' | 'overdue')
              }
              className="h-10 rounded-full bg-[#F1F5F9] px-4 text-xs font-medium text-slate-700 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>

            <div className="flex items-center gap-2 ml-auto">
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors">
                <Filter className="h-4 w-4 text-slate-500" />
                Filters
              </button>
              <button
                onClick={handleReset}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
              >
                <RefreshCw className="h-4 w-4 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
            {studentsQuery.isLoading ? (
              <div className="flex items-center justify-center py-20 text-sm text-slate-500">
                Loading students...
              </div>
            ) : studentsQuery.isError ? (
              <div className="flex items-center justify-center py-20 text-sm text-red-600">
                Failed to load students.
              </div>
            ) : studentsQuery.data && studentsQuery.data.students.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-sm text-slate-500">
                No students found.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
                        <th className="pb-3 px-3 font-semibold">Adm No</th>
                        <th className="pb-3 px-3 font-semibold">Student Name</th>
                        <th className="pb-3 px-3 font-semibold">Grade / Section</th>
                        <th className="pb-3 px-3 font-semibold">Parent / Guardian</th>
                        <th className="pb-3 px-3 font-semibold">Contact Number</th>
                        <th className="pb-3 px-3 font-semibold">Fee Status</th>
                        <th className="pb-3 px-3 font-semibold">Enrollment Date</th>
                        <th className="pb-3 px-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {studentsQuery.data?.students.map((student) => (
                        <tr
                          key={student.admNo}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="py-4 px-3 text-xs font-medium text-slate-600">
                            {student.admNo}
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <User className="h-5 w-5" />
                              </div>
                              <span className="font-bold text-slate-900">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-xs text-slate-500">
                            {student.grade}
                          </td>
                          <td className="py-4 px-3 text-xs text-slate-600">
                            {student.parent}
                          </td>
                          <td className="py-4 px-3 text-xs text-slate-600">
                            {student.contact}
                          </td>
                          <td className="py-4 px-3">
                            {student.feeStatus === 'paid' ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Paid
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                Overdue
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-3 text-xs text-slate-700">
                            {student.enrollmentDate}
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/students/${student.admNo}`}
                                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                              <button className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                                <CreditCard className="h-4 w-4" />
                              </button>
                              <button className="rounded-lg p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-slate-500">
                    {total > 0
                      ? `Showing ${start}-${end} of ${total} students`
                      : 'No students to show'}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {totalPages > 0 &&
                      Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(
                        (pn) => (
                          <button
                            key={pn}
                            onClick={() => setPage(pn)}
                            className={`h-8 w-8 rounded-full text-xs font-semibold transition-colors ${
                              page === pn
                                ? 'bg-[#4F46E5] text-white'
                                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {pn}
                          </button>
                        ),
                      )}
                    {totalPages > 3 && (
                      <span className="text-xs text-slate-400 px-1">...</span>
                    )}
                    {totalPages > 3 && (
                      <button className="h-8 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                        {totalPages}
                      </button>
                    )}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages || totalPages === 0}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
