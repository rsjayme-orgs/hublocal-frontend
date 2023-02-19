import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  initialColorMode: 'dark',
  fonts: {
    body: 'Poppins',
    heading: 'Poppins',
  },
  colors: {
    gray: {
      '1000': '#111217',
      '950': '#1a1b23',
      '900': '#1F2029',
      '800': '#606060',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '550': '#324757',
      '560': '#253441',
      '570': '#1E2A34',
      '400': '#797D9A',
      '300': '#9699B0',
      '250': '#9F9F9F',
      '200': '#B3B5C6',
      '150': '#C4C4C4',
      '150.2': '#C4C4C433',
      '100': '#D1D2DC',
      '90': '#E5E5F9',

      '70': '#E5E5E5',
      '50': '#EEEEF2',
      '25': '#f7f7f7',
    },
    green: {
      '800': '#354B46',
      '700': '#306C60',
      '600': '#64A092',
    },
    orange: {
      '300': '#F3DF71',
      '500': '#F07F2E',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#F5F5F5',
        color: '#000000',
      },
    },
  },
})
