import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { getErrorMessage } from '../utils/errors/getErrorMessage'

type IAuthProviderProps = {
  children: ReactNode
}

type ISignInProps = {
  email: string
  password: string
}

type IUseAuthProvider = {
  user:
    | {
        id: number
        name: string
        email: string
      }
    | undefined
  loading: boolean

  signIn: ({ email, password }: ISignInProps) => Promise<void>
  signOut: () => void
  signed: boolean
}

export const AuthContext = createContext<IUseAuthProvider>(
  {} as IUseAuthProvider,
)

function AuthProvider({ children }: IAuthProviderProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    const storagedUser = localStorage.getItem('@hublocal:user')
    const storagedToken = localStorage.getItem('@hublocal:token')

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser))
      api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(
        storagedToken,
      )}`
    }
    setLoading(false)
  }, [])

  async function signIn({ email, password }: ISignInProps) {
    setLoading(true)
    try {
      const { data } = await api.post('session', {
        email,
        password,
      })

      setUser(data.user)

      api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`

      localStorage.setItem('@hublocal:token', JSON.stringify(data.access_token))
      localStorage.setItem('@hublocal:user', JSON.stringify(data.user))
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  function signOut() {
    localStorage.removeItem('@hublocal:token')
    localStorage.removeItem('@hublocal:user')
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, signed: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { useAuth, AuthProvider }
