import { Button, ButtonProps } from '@chakra-ui/react'

interface StyledButtonProps extends ButtonProps {
  children: string
  bgColor: 'blue' | 'green' | 'red'
}

interface IButtonColor {
  blue: {
    backgroundColor: string
    hoverBackgroundColor: string
  }
  green: {
    backgroundColor: string
    hoverBackgroundColor: string
  }
  red: {
    backgroundColor: string
    hoverBackgroundColor: string
  }
}

export function StyledButton({
  children,
  bgColor,
  ...rest
}: StyledButtonProps) {
  const buttonColor: IButtonColor = {
    blue: {
      backgroundColor: '#0385FD',
      hoverBackgroundColor: 'blue.400',
    },
    green: {
      backgroundColor: '#00CC99',
      hoverBackgroundColor: 'green.300',
    },
    red: {
      backgroundColor: '#C90808',
      hoverBackgroundColor: 'red.500',
    },
  }

  return (
    <Button
      fontWeight="600"
      transition="background-color 0.2s"
      boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25);"
      borderRadius="5px"
      color="#FFF"
      background={buttonColor[bgColor].backgroundColor}
      _hover={{ backgroundColor: buttonColor[bgColor].hoverBackgroundColor }}
      {...rest}
    >
      {children}
    </Button>
  )
}
