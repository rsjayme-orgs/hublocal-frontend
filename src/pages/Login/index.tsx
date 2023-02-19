import { Flex, Text, Image } from '@chakra-ui/react'
import manImage from '../../assets/login/image1.png'
import logo from '../../assets/login/logo.png'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { user } = useAuth()

  console.log(user)
  return (
    <Flex>
      <Flex
        background="#0485FF"
        h="100vh"
        flex={1}
        flexDir="column"
        display={['none', 'none', 'flex']}
      >
        <Flex
          justifyContent="flex-end"
          justifySelf="end"
          minH="75vh"
          background={`url(${manImage})`}
          backgroundPosition="top"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        ></Flex>
        <Flex
          bg="#00CC99"
          h="100%"
          alignItems="center"
          flexDir="column"
          paddingX={4}
        >
          <Text
            fontSize="35px"
            color="#fff"
            w="100%"
            fontWeight="bold"
            textAlign="center"
            mt="14px"
          >
            Junte-se a vários <br /> clientes satisfeitos.
          </Text>
          <Text textAlign="center" maxW="500px" w="100%" color="#fff">
            Cliente HubLocal ganha mais relevância, autoridade e visibilidade.
            Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
          </Text>
        </Flex>
      </Flex>
      <Flex
        flex={1}
        bg="linear-gradient(90deg, #ECECEC 0%, #FFFFFF 14.58%);"
        px={8}
      >
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Image src={logo} alt="HubLocal Logo" mb="60px" />
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  )
}
