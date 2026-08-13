export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name?: string | null
    role?: string | null
  }
  data?: {
    id?: string
    email?: string
    name?: string | null
    role?: string | null
  }
}

export async function getMe(): Promise<AuthResponse> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  })
  return response.json()
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })
  return response.json()
}

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })
  return response.json()
}

export async function updateProfile(data: { name?: string; role?: string }): Promise<AuthResponse> {
  const response = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })
  return response.json()
}

// authApi.ts
export async function logout():Promise<AuthResponse>{
  const response = await fetch("/api/auth/logout",{
    method: "POST",
    credentials: "include",
  })
  return response.json()
}
