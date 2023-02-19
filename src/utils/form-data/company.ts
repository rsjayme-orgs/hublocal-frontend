import { cnpjMask } from '../inputMaks/cnpj'

export function generateData() {
  return [
    [
      {
        name: 'name',
        label: 'Nome',
        category: 'input',
      },
    ],
    [
      {
        name: 'website',
        label: 'Website',
        category: 'input',
      },
      {
        name: 'cnpj',
        label: 'CNPJ',
        category: 'input',
        mask: cnpjMask,
      },
    ],
  ]
}
