import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('@hublocal:user')
      localStorage.removeItem('@hublocal:token')
      window.location.href = '/'
    }

    return Promise.reject(error)
  },
)

export { api }
