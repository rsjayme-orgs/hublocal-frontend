import { Flex, Text, useDisclosure, Image } from '@chakra-ui/react'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { StyledButton } from '../../components/StyledButton'
import { PageLayout } from '../../layouts/PageLayout'
import DataTable from 'react-data-table-component'
import { paginationComponentOptions } from '../../utils/ReactDataTableConfigs'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CustomModal } from '../../components/Modal'
import { generateLocationsColumns } from '../../utils/formColumnsGenerator/locations'
import { generateData } from '../../utils/form-data/location'
import arrowLeftIcon from '../../assets/icons/arrowLeftIcon.svg'
import { getErrorMessage } from '../../utils/errors/getErrorMessage'
import { HeaderLocations } from '../../components/HeaderLocations'

export function Locations() {
  const [locationsData, setLocationsData] = useState<any>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editData, setEditData] = useState()
  const [modalTitle, setModalTitle] = useState('')
  const [deleteData, setDeleteData] = useState()
  const [deleteBody, setDeleteBody] = useState<ReactNode>()
  const [buttonText, setButtonText] = useState('')
  const [companiesList, setCompaniesList] = useState([])

  const { companyId } = useParams()

  async function handleCreateOpenModal() {
    setEditData(undefined)
    setDeleteData(undefined)
    setModalTitle('Adicionar local')
    setButtonText('Adicionar')
    onOpen()
  }

  async function handleEditOpenModal(editData: any) {
    setDeleteData(undefined)
    setEditData(editData)
    setModalTitle(`Editar: ${editData.name}`)
    setButtonText('Salvar')
    onOpen()
  }

  async function handleDeleteOpenModal(deleteData: any) {
    setDeleteData(deleteData)
    setEditData(undefined)
    setModalTitle('Confirmação de exclusão')
    setButtonText('Excluir')
    setDeleteBody(
      <>
        O local <b>{deleteData.name}</b> será excluído. Tem certeza dessa ação?
      </>,
    )
    onOpen()
  }

  const columns = generateLocationsColumns({
    handleDeleteOpenModal,
    handleEditOpenModal,
  })

  const loadData = useCallback(async () => {
    try {
      const response = await api.get(`locations/${companyId}`)
      setLocationsData(response.data)
      const companiesResponse = await api.get('companies')
      setCompaniesList(companiesResponse.data)
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
  }, [companyId])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function onRegisterSubmit(data: any) {
    try {
      const dataToSend = { ...data, company_id: companyId }

      const response: any = await api.post('locations', dataToSend)

      setLocationsData([...locationsData, response.data])

      toast.success('Local criado com sucesso!')

      onClose()
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
  }

  async function onEditSubmit(data: any) {
    try {
      const response: any = await api.put(`locations/${data.id}`, data)

      const locationsMirror = [...locationsData]

      const index = locationsMirror.findIndex(
        (location) => location.id === data.id,
      )

      locationsMirror[index] = response.data

      setLocationsData(locationsMirror)

      toast.success('Local atualizado com sucesso!')

      onClose()
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
  }

  async function onDeletSubmit(data: any) {
    try {
      const locationsMirror = [...locationsData]
      const deleteIndex = locationsMirror.findIndex(
        (location) => location.id === data.id,
      )

      locationsMirror.splice(deleteIndex, 1)
      setLocationsData(locationsMirror)

      await api.delete(`locations/${data.id}`)

      toast.success('Local removido com sucesso!')

      onClose()
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
    const locationsMirror = [...locationsData]
    const deleteIndex = locationsMirror.findIndex(
      (location) => location.id === data.id,
    )

    locationsMirror.splice(deleteIndex, 1)
    setLocationsData(locationsMirror)

    await api.delete(`locations/${data.id}`)

    onClose()
  }

  function getSubmitFunction() {
    if (editData) return onEditSubmit
    if (deleteData) return onDeletSubmit

    return onRegisterSubmit
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        bgColor={deleteData ? 'red' : 'blue'}
        title={modalTitle}
        onSubmit={getSubmitFunction()}
        editData={editData}
        buttonText={buttonText}
        deleteData={deleteData}
        generateData={generateData}
        deleteBody={deleteBody}
      />
      <Flex minH="100vh" h="100%" flexDir="column">
        <HeaderLocations
          selectedCompanyId={companyId}
          companiesList={companiesList}
        />
        <PageLayout>
          <Link to="/companies">
            <Flex mt="25px">
              <Image
                src={arrowLeftIcon}
                alt="Ícone de uma seta para a esquerda"
              />
              <Text ml="9px">Minhas empresas</Text>
            </Flex>
          </Link>
        </PageLayout>
        {locationsData.length > 0 ? (
          <PageLayout>
            <Flex w="100%" mt="46px" flexDir="column">
              <Flex ml="auto">
                <StyledButton
                  bgColor="blue"
                  height="50px"
                  px="32px"
                  fontSize="20px"
                  onClick={handleCreateOpenModal}
                >
                  Adicionar Local
                </StyledButton>
              </Flex>
              <Flex
                mt="25px"
                flexDir="column"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              >
                <DataTable
                  columns={columns}
                  data={locationsData}
                  pagination
                  paginationComponentOptions={paginationComponentOptions}
                />
              </Flex>
            </Flex>
          </PageLayout>
        ) : (
          <Flex
            flex={1}
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <Text fontWeight="bold" fontSize="60px" textAlign="center">
              Nenhum local <br /> cadastrada!
            </Text>
            <StyledButton
              bgColor="blue"
              height="60px"
              px="45px"
              fontSize="25px"
              mt="35px"
              onClick={handleCreateOpenModal}
            >
              Adicionar Local
            </StyledButton>
          </Flex>
        )}
      </Flex>
    </>
  )
}
