export function getErrorMessage(errorData: any) {
  if (errorData.response) {
    if (typeof errorData.response.data.message === 'string') {
      return errorData.response.data.message
    }

    if (errorData.response.data.message.length > 0) {
      return errorData.response.data.message[0]
    }
  }

  if (errorData.message) {
    return errorData.message
  }

  return 'Oops.. Aconteceu um erro inesperado! Tente novamente em alguns minutos'
}
