import { cepMask } from '../inputMaks/cep'
import { numberMask } from '../inputMaks/number'

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
        name: 'zipcode',
        label: 'CEP',
        category: 'input',
        mask: cepMask,
      },
      {
        name: 'street',
        label: 'Rua',
        category: 'input',
      },
    ],
    [
      {
        name: 'number',
        label: 'Número',
        category: 'input',
        mask: numberMask,
      },
      {
        name: 'neighborhood',
        label: 'Bairro',
        category: 'input',
      },
    ],
    [
      {
        name: 'city',
        label: 'Cidade',
        category: 'input',
      },
      {
        name: 'state',
        label: 'Estado',
        category: 'input',
      },
    ],
  ]
}
