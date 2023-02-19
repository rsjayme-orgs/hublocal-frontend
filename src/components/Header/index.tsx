import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import companyIcon from '../../assets/icons/company.svg'
import chevronDownIcon from '../../assets/icons/chevronDown.svg'
import { useAuth } from '../../hooks/useAuth'

interface IHeaderProps {
  title: string
}

export function Header({ title }: IHeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <Flex bg="#FFF" w="100%" h="80px">
      <Flex alignItems="center" ml="35px" flex={1}>
        <Image
          src={companyIcon}
          w="33px"
          h="33px"
          alt="Icone da empresa"
          mr="10px"
        />
        <Text fontWeight="700" fontSize="30px">
          {title}
        </Text>
      </Flex>
      <Flex
        bg="#EAEAEA"
        minW="251px"
        alignItems="center"
        px="64px"
        justifyContent="space-between"
      >
        <Menu>
          <MenuButton
            as={Button}
            background="none"
            _hover={{ background: 'none' }}
            _active={{ background: 'none' }}
            rightIcon={
              <Image
                src={chevronDownIcon}
                w="16px"
                h="10px"
                justifySelf="flex-end"
                alt="Indicador para baixo"
              />
            }
          >
            <Text fontWeight="600" fontSize="20px" mr="40px">
              {user?.name}
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}
