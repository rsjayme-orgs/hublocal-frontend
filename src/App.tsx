import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './hooks/useAuth'
import { AppRoutes } from './routes'
import { chakraTheme } from './styles/chakraTheme'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <AuthProvider>
        <ChakraProvider theme={chakraTheme}>
          <AppRoutes />
        </ChakraProvider>
      </AuthProvider>
    </>
  )
}

export default App
