import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  CreditCard,
  FileText,
  Search,
  Bell,
  Download,
  Plus,
  User,
  Activity,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'
import { getDashboardStats } from '@/services/dashboard.service'
import { Sidebar } from '@/components/layout/Sidebar'

function Dashboard() {
  const statsQuery = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  })

  if (statsQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-medium">Loading dashboard...</div>
      </div>
    )
  }

  if (statsQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-red-600 font-medium">Failed to load dashboard data.</div>
      </div>
    )
  }

  const stats = statsQuery.data

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activeHref="/dashboard" />

      <div className="flex flex-1 flex-col min-w-0">
        {/* Header / Top Navigation Bar */}
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

        {/* Dashboard Content */}
        <main className="flex-1 px-8 pb-8 space-y-6">
          {/* Action Row & Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Administrator Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Welcome back, Sanal. Here is the operational overview for MMPS today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors">
                <Download className="h-4 w-4 text-slate-500" />
                Export Report
              </button>
              <Link
                to="/students/new"
                className="flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add New Student
              </Link>
            </div>
          </div>

          {/* Metric Cards (4 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Total Students */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  TOTAL STUDENTS
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stats?.totalStudents}</p>
                <p className="mt-1 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <span>↗</span> {stats?.studentChange}
                </p>
              </div>
            </div>

            {/* Card 2: Fees Collected */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  FEES COLLECTED
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stats?.feesCollected}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{stats?.feesTarget}</p>
              </div>
            </div>

            {/* Card 3: Staff Attendance */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  STAFF ATTENDANCE
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stats?.staffAttendance}</p>
                <p className="mt-1 text-xs font-semibold text-emerald-600">
                  {stats?.attendanceActive}
                </p>
              </div>
            </div>

            {/* Card 4: Pending Dues */}
            <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  PENDING DUES
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stats?.pendingDues}</p>
                <p className="mt-1 text-xs font-semibold text-red-500">{stats?.overdueCount}</p>
              </div>
            </div>
          </div>

          {/* Main Workspace Layout (2 Cols vs 1 Col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section: Recent Fee Collections (2 Cols) */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Recent Fee Collections</h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Latest transactions processed across all standards
                  </p>
                </div>
                <Link
                  to="/fees"
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  View All Fees
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Fee Collections Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
                      <th className="pb-3 px-3 font-semibold">Receipt ID</th>
                      <th className="pb-3 px-3 font-semibold">Student</th>
                      <th className="pb-3 px-3 font-semibold">Standard</th>
                      <th className="pb-3 px-3 font-semibold">Amount</th>
                      <th className="pb-3 px-3 font-semibold">Method</th>
                      <th className="pb-3 px-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {stats?.feeCollections.map((fee) => (
                      <tr key={fee.receiptId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-3 text-xs font-medium text-slate-600">
                          {fee.receiptId}
                        </td>
                        <td className="py-4 px-3 font-bold text-slate-900">{fee.student}</td>
                        <td className="py-4 px-3 text-xs text-slate-500">{fee.standard}</td>
                        <td className="py-4 px-3 font-bold text-slate-900">{fee.amount}</td>
                        <td className="py-4 px-3 text-xs text-slate-600">{fee.method}</td>
                        <td className="py-4 px-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Section: Quick Actions & Operational Logs (1 Col) */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {/* Add Student */}
                  <Link
                    to="/students/new"
                    className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-100 bg-white p-4 text-center hover:border-slate-200 hover:bg-slate-50/60 transition-all cursor-pointer"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Add Student</span>
                  </Link>

                  {/* Collect Fee */}
                  <button className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-100 bg-white p-4 text-center hover:border-slate-200 hover:bg-slate-50/60 transition-all cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Collect Fee</span>
                  </button>

                  {/* Fee Report */}
                  <button className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-100 bg-white p-4 text-center hover:border-slate-200 hover:bg-slate-50/60 transition-all cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Fee Report</span>
                  </button>

                  {/* Send Alerts */}
                  <button className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-slate-100 bg-white p-4 text-center hover:border-slate-200 hover:bg-slate-50/60 transition-all cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                      <Bell className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Send Alerts</span>
                  </button>
                </div>
              </div>

              {/* Operational Logs */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900 mb-5">Operational Logs</h2>
                <div className="space-y-5">
                  {stats?.operationalLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3">
                      <span className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${log.color}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{log.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500">{log.description}</p>
                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          {log.time} • by {log.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard