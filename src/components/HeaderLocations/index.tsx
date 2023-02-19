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

import { Link } from 'react-router-dom'

interface IHeaderProps {
  selectedCompanyId: string | undefined
  companiesList: {
    id: number
    name: string
  }[]
}

export function HeaderLocations({
  selectedCompanyId,
  companiesList,
}: IHeaderProps) {
  const { user, signOut } = useAuth()

  const selectedCompany = companiesList.find(
    (company) => company.id === Number(selectedCompanyId),
  )

  return (
    <Flex bg="#FFF" w="100%" h="80px">
      <Flex alignItems="center" flex={1}>
        <Flex bg="#EAEAEA" h="100%" alignItems="center" px="35px">
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
              <Flex>
                <Image
                  src={companyIcon}
                  w="33px"
                  h="33px"
                  alt="Icone da empresa"
                  mr="10px"
                />
                <Text fontWeight="700" fontSize="30px">
                  {selectedCompany?.name}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              {companiesList.map((company: any) => (
                <MenuItem key={company.id}>
                  <Link to={`/locations/${company.id}`}>{company.name}</Link>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
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
