import { Flex, InputProps, SimpleGrid } from '@chakra-ui/react'
import { FormInput } from '../FormInput'

interface IInputProps extends InputProps {
  name: string
  label: string
  type?: string
  category: string
}

interface IFormComponentProps {
  data: IInputProps[][]
  isLoading?: boolean
  showButton?: boolean
  buttonText: string
}

export function FormGenerator({ data }: IFormComponentProps) {
  function generateInputs(data: any) {
    const inputs = data.map((inputs: any, index: number) => {
      return (
        <SimpleGrid
          minChildWidth={['240px', '70px']}
          spacing="3"
          w="100%"
          mb={4}
          key={index}
        >
          {inputs.map((input: IInputProps, index: number) => {
            if (input.category === 'input') {
              const customInput = input as IInputProps
              return <FormInput key={index} ml={0} {...customInput} />
            }
            return null
          })}
        </SimpleGrid>
      )
    })
    return inputs
  }

  return (
    <>
      <Flex flexDirection="column">
        {generateInputs(data).map((Input: any) => Input)}
      </Flex>
    </>
  )
}
