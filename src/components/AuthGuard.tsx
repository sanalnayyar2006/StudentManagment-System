import { Navigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/services/auth.service'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const { data, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getMe,
    retry: false,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-medium">Loading...</div>
      </div>
    )
  }

  if (!data?.success) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
