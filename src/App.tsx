import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import Students from './pages/Students'
import StudentProfile from './pages/StudentProfile'
import PersonalDetails from './pages/PersonalDetails'
import EditProfile from './pages/EditProfile'
import AddStudent from './pages/AddStudent'
import { AuthGuard } from '@/components/AuthGuard'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: '/students/:admNo/personal-details',
    element: (
      <AuthGuard>
        <PersonalDetails />
      </AuthGuard>
    ),
  },
  {
    path: '/students/:admNo/edit-profile',
    element: (
      <AuthGuard>
        <EditProfile />
      </AuthGuard>
    ),
  },
  {
    path: '/students/new',
    element: (
      <AuthGuard>
        <AddStudent />
      </AuthGuard>
    ),
  },
  {
    path: '/students/:admNo',
    element: (
      <AuthGuard>
        <StudentProfile />
      </AuthGuard>
    ),
  },
  {
    path: '/students',
    element: (
      <AuthGuard>
        <Students />
      </AuthGuard>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
