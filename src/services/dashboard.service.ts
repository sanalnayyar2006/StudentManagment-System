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

const mockStats: DashboardStats = {
  totalStudents: '1,248',
  studentChange: '+14 this month',
  feesCollected: '₹4,82,400',
  feesTarget: '82% of monthly target',
  staffAttendance: '100%',
  attendanceActive: '84/84 active today',
  pendingDues: '₹1,12,000',
  overdueCount: '18 students overdue',
  feeCollections: [
    {
      receiptId: 'REC-2024-0982',
      student: 'Aarav Sharma',
      standard: 'Grade 10-A',
      amount: '₹12,500',
      method: 'UPI (GPay)',
      status: 'Paid',
    },
    {
      receiptId: 'REC-2024-0981',
      student: 'Priya Patel',
      standard: 'Grade 12-B',
      amount: '₹18,200',
      method: 'Net Banking',
      status: 'Paid',
    },
    {
      receiptId: 'REC-2024-0980',
      student: 'Vikram Malhotra',
      standard: 'Grade 8-C',
      amount: '₹8,400',
      method: 'Cash',
      status: 'Paid',
    },
    {
      receiptId: 'REC-2024-0979',
      student: 'Ananya Iyer',
      standard: 'Grade 11-A',
      amount: '₹15,000',
      method: 'Credit Card',
      status: 'Paid',
    },
  ],
  operationalLogs: [
    {
      id: '1',
      title: 'New student admitted',
      description: 'Kabir Sen admitted to Grade 1-A',
      time: '10 mins ago',
      author: 'Meera Nair',
      color: 'bg-blue-600',
    },
    {
      id: '2',
      title: 'Fee Receipt generated',
      description: '₹18,200 payment recorded for Priya Patel',
      time: '1 hour ago',
      author: 'Rajesh Kumar',
      color: 'bg-emerald-500',
    },
    {
      id: '3',
      title: 'Payment Failed Alert',
      description: 'UPI transaction bounced for Rohan Roy',
      time: '2 hours ago',
      author: 'Automated System',
      color: 'bg-red-500',
    },
  ],
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return mockStats
}