import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from '@/services/auth.service'
import { UserCheck } from 'lucide-react'

export function Onboarding() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('Super Administrator')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const profileMutation = useMutation({
    mutationFn: () => updateProfile({ name, role }),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['currentUser'] })
        navigate('/dashboard')
      } else {
        setError(res.message || 'Failed to update profile.')
      }
    },
    onError: () => {
      setError('An error occurred while saving your details.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name or username.')
      return
    }
    setError(null)
    profileMutation.mutate()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 border border-slate-100 shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4F46E5] text-white shadow-lg shadow-indigo-200">
            <UserCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Complete Your Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please enter your name and role to customize your workspace
          </p>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Full Name / Display Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Sanal Nayyar"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 h-11 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Role in Organization <span className="text-red-500">*</span>
            </Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="Super Administrator">Super Administrator</option>
              <option value="School Principal">School Principal</option>
              <option value="Academic Director">Academic Director</option>
              <option value="Senior Teacher">Senior Teacher</option>
              <option value="Staff Administrator">Staff Administrator</option>
            </select>
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={profileMutation.isPending}
            className="w-full h-11 rounded-xl bg-[#4F46E5] font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all disabled:opacity-50"
          >
            {profileMutation.isPending ? 'Saving details...' : 'Save & Continue to Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  )
}
