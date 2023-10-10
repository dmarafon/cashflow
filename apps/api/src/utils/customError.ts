export const customError = (statusCode: number, errorName: string, originalMessage = '') => {
  const error = new Error(originalMessage)

  error.cause = statusCode
  error.name = errorName
  error.message = originalMessage

  return error
}
