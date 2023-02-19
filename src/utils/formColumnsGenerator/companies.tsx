import { Text, Box, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import editIcon from '../../assets/icons/editIcon.svg'
import addLocationIcon from '../../assets/icons/addLocationIcon.svg'
import deleteIcon from '../../assets/icons/deleteIcon.svg'

interface IRow {
  id: number
  name: string
  locations: {
    id: number
  }[]
}

interface IGenerateCompaniesColumns {
  handleEditOpenModal: (row: IRow) => void
  handleDeleteOpenModal: (row: IRow) => void
}

export function generateCompaniesColumns({
  handleEditOpenModal,
  handleDeleteOpenModal,
}: IGenerateCompaniesColumns) {
  return [
    {
      name: (
        <Text fontWeight="600" fontSize="18px">
          Empresa
        </Text>
      ),
      selector: (row: IRow) => row.name,
    },
    {
      name: (
        <Text fontWeight="600" fontSize="18px">
          Qt de Locais
        </Text>
      ),
      selector: (row: IRow) => (row.locations ? row.locations?.length : 0),
    },
    {
      name: (
        <Text fontWeight="600" fontSize="18px">
          Ações
        </Text>
      ),
      cell: (row: IRow) => (
        <HStack spacing="22px">
          <Box p={2} cursor="pointer" onClick={() => handleEditOpenModal(row)}>
            <Image w="22px" h="22px" src={editIcon} alt="Ícone de edição" />
          </Box>
          <Link to={`/locations/${row.id}`}>
            <Image
              w="22px"
              h="22px"
              src={addLocationIcon}
              alt="Ícone de adição de locais"
            />
          </Link>
          <Box
            p={2}
            cursor="pointer"
            onClick={() => handleDeleteOpenModal(row)}
          >
            <Image w="22px" h="22px" src={deleteIcon} alt="Ícone de deleção" />
          </Box>
        </HStack>
      ),
    },
  ]
}
