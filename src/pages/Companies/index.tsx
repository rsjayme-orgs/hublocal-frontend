import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Header } from '../../components/Header'
import { StyledButton } from '../../components/StyledButton'
import { PageLayout } from '../../layouts/PageLayout'
import DataTable from 'react-data-table-component'
import { paginationComponentOptions } from '../../utils/ReactDataTableConfigs'

import { CustomModal } from '../../components/Modal'
import { generateCompaniesColumns } from '../../utils/formColumnsGenerator/companies'
import { generateData } from '../../utils/form-data/company'
import { toast } from 'react-toastify'
import { getErrorMessage } from '../../utils/errors/getErrorMessage'

export function Companies() {
  const [companiesData, setCompaniesData] = useState<any>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editData, setEditData] = useState()
  const [modalTitle, setModalTitle] = useState('')
  const [deleteData, setDeleteData] = useState()
  const [deleteBody, setDeleteBody] = useState<ReactNode>()
  const [buttonText, setButtonText] = useState('')

  async function handleCreateOpenModal() {
    setEditData(undefined)
    setDeleteData(undefined)
    setModalTitle('Adicionar empresa')
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
        A empresa <b>{deleteData.name}</b> será excluída. Tem certeza dessa
        ação?
      </>,
    )
    onOpen()
  }

  const columns = generateCompaniesColumns({
    handleDeleteOpenModal,
    handleEditOpenModal,
  })

  const loadCompanyData = useCallback(async () => {
    try {
      const response = await api.get('companies')
      setCompaniesData(response.data)
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
  }, [])

  useEffect(() => {
    loadCompanyData()
  }, [loadCompanyData])

  async function onRegisterSubmit(data: any) {
    try {
      const response: any = await api.post('companies', data)

      setCompaniesData([...companiesData, response.data])
      toast.success('Empresa cadastrada com sucesso!')

      onClose()
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
  }

  async function onEditSubmit(data: any) {
    try {
      const response: any = await api.put(`companies/${data.id}`, data)

      const companiesMirror = [...companiesData]

      const index = companiesMirror.findIndex(
        (company) => company.id === data.id,
      )

      companiesMirror[index] = response.data

      setCompaniesData(companiesMirror)
      toast.success('Empresa atualizada com sucesso!')

      onClose()
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
  }

  async function onDeletSubmit(data: any) {
    try {
      const companiesMirror = [...companiesData]
      const deleteIndex = companiesMirror.findIndex(
        (company) => company.id === data.id,
      )

      companiesMirror.splice(deleteIndex, 1)
      setCompaniesData(companiesMirror)

      await api.delete(`companies/${data.id}`)
      toast.success('Empresa removida com sucesso!')

      onClose()
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error(errorMessage)
    }
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
        <Header title="Minhas Empresas" />
        {companiesData.length > 0 ? (
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
                  Adicionar Empresa
                </StyledButton>
              </Flex>
              <Flex
                mt="25px"
                flexDir="column"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              >
                <DataTable
                  columns={columns}
                  data={companiesData}
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
              Nenhuma empresa <br /> cadastrada!
            </Text>
            <StyledButton
              bgColor="blue"
              height="60px"
              px="45px"
              fontSize="25px"
              mt="35px"
              onClick={handleCreateOpenModal}
            >
              Adicionar Empresa
            </StyledButton>
          </Flex>
        )}
      </Flex>
    </>
  )
}
