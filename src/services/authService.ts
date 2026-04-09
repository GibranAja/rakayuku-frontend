interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: {
      id: number
      name: string
      email: string
    }
    token: string
  }
  meta: {
    timestamp: string
  }
}

const API_BASE_URL = 'http://localhost:8000/api/v1'

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse['data']> {
    const payload: LoginRequest = {
      email,
      password,
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Login failed with status ${response.status}`)
      }

      const data: LoginResponse = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Login gagal')
      }

      return data.data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Login gagal. Silakan coba lagi.')
    }
  },
}
