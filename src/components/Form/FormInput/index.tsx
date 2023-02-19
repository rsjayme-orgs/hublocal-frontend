import { Flex, Input, InputProps, Text } from '@chakra-ui/react'
import { useFormContext, Controller } from 'react-hook-form'

interface IFormInput extends InputProps {
  label: string
  name: string
  ml?: any
  mask?: (value: string) => string
}

export function FormInput({ label, name, ml, mask, ...rest }: IFormInput) {
  const { control } = useFormContext()
  return (
    <Flex flexDirection="column" ml={ml}>
      <Controller
        control={control}
        name={name}
        shouldUnregister={true}
        render={({ field: { onChange, value } }) => (
          <>
            <Text fontSize={16}>{label}</Text>
            <Input
              h="45px"
              border="2px solid #0385FD"
              value={value}
              onChange={(e) =>
                onChange(mask ? mask(e.target.value) : e.target.value)
              }
              {...rest}
            />
          </>
        )}
      />
    </Flex>
  )
}
