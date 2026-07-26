import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import Students from './pages/Students'
import StudentProfile from './pages/StudentProfile'
import PersonalDetails from './pages/PersonalDetails'
import EditProfile from './pages/EditProfile'

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
    element: <Dashboard />,
  },
  {
    path: '/students/:admNo/personal-details',
    element: <PersonalDetails />,
  },
  {
    path: '/students/:admNo/edit-profile',
    element: <EditProfile />,
  },
  {
    path: '/students/:admNo',
    element: <StudentProfile />,
  },
  {
    path: '/students',
    element: <Students />,
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