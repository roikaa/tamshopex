// types/user.ts
export interface User {
  id: string
  email: string
  name: string | null
  role: 'ADMIN' | 'CUSTOMER'
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserRequest {
  email: string
  password: string
  name?: string
  role?: 'ADMIN' | 'CUSTOMER'
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  password?: string
  role?: 'ADMIN' | 'CUSTOMER'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}
