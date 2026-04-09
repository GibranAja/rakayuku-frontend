<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { authService } from '@/services/authService'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const toast = useToast()

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  // Client-side validation
  if (!email.value.trim()) {
    toast.error('Email tidak boleh kosong')
    return
  }

  if (!password.value) {
    toast.error('Password tidak boleh kosong')
    return
  }

  isLoading.value = true

  try {
    const result = await authService.login(email.value, password.value)

    // Success toast with user info
    toast.success(`Login berhasil! Selamat datang, ${result.user.name}`)

    // Reset form
    email.value = ''
    password.value = ''
  } catch (err) {
    // Error toast
    const errorMessage = err instanceof Error ? err.message : 'Login gagal'
    toast.error(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Masuk</h1>
        <p>Masukkan email dan password Anda</p>
      </div>

      <form @submit="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="admin@example.com"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            :disabled="isLoading"
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">Masuk</span>
          <span v-else class="loading-spinner">
            <span class="spinner"></span>
            Proses...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;
}

.login-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 34px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 400px;
  width: 100%;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  font-family: 'Alumni Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #227d55;
  margin-bottom: 8px;
}

.login-header p {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #666;
  font-weight: 400;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 12px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: #fafafa;
}

.form-group input:hover:not(:disabled) {
  border-color: #227d55;
  background-color: #fff;
}

.form-group input:focus {
  outline: none;
  border-color: #227d55;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(34, 125, 85, 0.1);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.submit-btn {
  padding: 12px 16px;
  background-color: #227d55;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1a5e41;
  box-shadow: 0 4px 12px rgba(34, 125, 85, 0.3);
  transform: translateY(-1px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(34, 125, 85, 0.2);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive design */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }

  .login-header h1 {
    font-size: 24px;
  }

  .login-header p {
    font-size: 13px;
  }

  .form-group input,
  .submit-btn {
    padding: 11px 12px;
    font-size: 14px;
  }
}
</style>
