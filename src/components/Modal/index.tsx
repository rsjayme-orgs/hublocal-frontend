import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { StyledButton } from '../StyledButton'
import { useForm, FormProvider } from 'react-hook-form'
import { FormGenerator } from '../Form/FormGenerator'
import { ReactNode, useEffect } from 'react'

interface CustomModalProps {
  title: string
  buttonText: string
  isOpen: boolean
  bgColor: 'blue' | 'red'
  onClose: () => void
  onSubmit: (data: any) => void
  editData: any
  deleteData: any
  generateData: () => any
  deleteBody: ReactNode
}

interface IModalColor {
  blue: {
    backgroundColor: string
  }
  red: {
    backgroundColor: string
  }
}

export function CustomModal({
  title,
  isOpen,
  onClose,
  bgColor,
  onSubmit,
  editData,
  buttonText,
  deleteData,
  generateData,
  deleteBody,
}: CustomModalProps) {
  const modalColor: IModalColor = {
    blue: {
      backgroundColor: '#0385FD',
    },
    red: {
      backgroundColor: '#C90808',
    },
  }

  const methods = useForm()

  useEffect(() => {
    if (!editData) return
    Object.keys(editData).forEach((key) => {
      if (!editData[key]) return
      methods.setValue(key, editData[key])
    })
  }, [editData, methods, isOpen])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalHeader
            borderRadius="10px 10px 0 0"
            background={modalColor[bgColor].backgroundColor}
            color="#FFF"
            fontWeight="700"
            fontSize="25px"
            mb="30px"
          >
            {title}
          </ModalHeader>
          <ModalCloseButton color="#FFF" />
          {deleteData ? (
            <>
              <ModalBody fontSize="18px">{deleteBody}</ModalBody>
              <ModalFooter>
                <StyledButton
                  type="submit"
                  bgColor="red"
                  onClick={() => onSubmit(deleteData)}
                >
                  {buttonText}
                </StyledButton>
              </ModalFooter>
            </>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ModalBody pb={6}>
                  <FormGenerator
                    buttonText="Cadastrar"
                    data={generateData()}
                    isLoading={false}
                  />
                </ModalBody>

                <ModalFooter>
                  <StyledButton type="submit" bgColor="blue">
                    {buttonText}
                  </StyledButton>
                </ModalFooter>
              </form>
            </FormProvider>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
