import { Stack, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { StyledButton } from '../StyledButton'

export function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  function handleCreateAccountButton() {
    navigate('/register')
  }

  function handleLoginButton() {
    signIn({ email, password })
  }

  return (
    <>
      <Stack maxW="400px" w="100%" spacing="10px">
        <Flex flexDir="column">
          <Text>Email</Text>
          <Input
            type="email"
            h="60px"
            border="2px solid #0385FD"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>

        <Flex flexDir="column">
          <Text>Senha</Text>
          <Input
            type="password"
            h="60px"
            border="2px solid #0385FD"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Flex>
      </Stack>

      <StyledButton
        bgColor="blue"
        mt="24px"
        maxW="400px"
        w="100%"
        fontSize="20px"
        fontWeight="700"
        height="60px"
        onClick={handleLoginButton}
      >
        LOGAR
      </StyledButton>

      <StyledButton
        bgColor="green"
        mt="17px"
        maxW="400px"
        w="100%"
        fontSize="20px"
        fontWeight="700"
        height="60px"
        onClick={handleCreateAccountButton}
      >
        CRIAR CONTA
      </StyledButton>
    </>
  )
}
