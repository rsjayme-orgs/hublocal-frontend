import { Stack, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { getErrorMessage } from '../../utils/errors/getErrorMessage'
import { StyledButton } from '../StyledButton'

export function CreateAccountForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigate = useNavigate()

  function handleLogintButton() {
    navigate('/')
  }

  async function handleSubmit() {
    if (password !== passwordConfirm) {
      toast.error('As senhas devem ser iguais')
      return
    }

    try {
      await api.post('users', {
        name,
        email,
        password,
      })

      toast.success('Usuário cadastrado com sucesso!')
      navigate('/')
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <Stack maxW="400px" w="100%" spacing="10px">
        <Flex flexDir="column">
          <Text>Nome</Text>
          <Input
            h="60px"
            border="2px solid #0385FD"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Flex>

        <Flex flexDir="column">
          <Text>Email</Text>
          <Input
            type="email"
            h="60px"
            border="2px solid #0385FD"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>

        <Flex flexDir="column">
          <Text>Senha</Text>
          <Input
            type="password"
            h="60px"
            border="2px solid #0385FD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Flex>

        <Flex flexDir="column">
          <Text>Repetir Senha</Text>
          <Input
            type="password"
            h="60px"
            border="2px solid #0385FD"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
        onClick={handleSubmit}
      >
        REGISTRAR
      </StyledButton>

      <StyledButton
        bgColor="green"
        mt="17px"
        maxW="400px"
        w="100%"
        fontSize="20px"
        fontWeight="700"
        height="60px"
        onClick={handleLogintButton}
      >
        LOGAR
      </StyledButton>
    </>
  )
}
