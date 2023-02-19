import { Text, Box, HStack, Image } from '@chakra-ui/react'
import editIcon from '../../assets/icons/editIcon.svg'
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

export function generateLocationsColumns({
  handleEditOpenModal,
  handleDeleteOpenModal,
}: IGenerateCompaniesColumns) {
  return [
    {
      name: (
        <Text fontWeight="600" fontSize="18px">
          Local
        </Text>
      ),
      selector: (row: IRow) => row.name,
    },
    {
      name: (
        <Text fontWeight="600" fontSize="18px">
          Ações
        </Text>
      ),
      cell: (row: IRow) => (
        <HStack spacing="10px">
          <Box p={2} cursor="pointer" onClick={() => handleEditOpenModal(row)}>
            <Image w="22px" h="22px" src={editIcon} alt="Ícone de edição" />
          </Box>
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
