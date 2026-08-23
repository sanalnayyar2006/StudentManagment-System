import { getApiUrl } from '../lib/api'

export interface FeeCollection {
  receiptId: string
  student: string
  standard: string
  amount: string
  method: string
  status: string
}

export interface OperationalLog {
  id: string
  title: string
  description: string
  time: string
  author: string
  color: string
}

export interface DashboardStats {
  totalStudents: string
  studentChange: string
  feesCollected: string
  feesTarget: string
  staffAttendance: string
  attendanceActive: string
  pendingDues: string
  overdueCount: string
  feeCollections: FeeCollection[]
  operationalLogs: OperationalLog[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(getApiUrl('/api/dashboard'), {
    credentials: 'include',
  })
  const json = await response.json()
  if (!json.success) throw new Error(json.message || 'Failed to fetch dashboard stats')
  return json.data
}
