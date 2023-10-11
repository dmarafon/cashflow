import { Response } from 'express'
import { ValidationError } from 'express-validation'
import { generalError, notFoundError } from './errors'

describe('Given a notFoundError function', () => {
  describe('When its invoked', () => {
    it('Tit should call the next function with an error', () => {
      const nextFunction = jest.fn()
      const error = new Error()

      notFoundError(null, null, nextFunction)

      expect(nextFunction).toHaveBeenCalledWith(error)
    })
  })
})

describe('Given an generalError function', () => {
  describe('When its invoked with an empty error', () => {
    test('Then it should call the responses status method with a 500', () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      const expectedError = 500
      const error = { cause: 500 }

      generalError(error, null, res, null)

      expect(res.status).toHaveBeenCalledWith(expectedError)
    })
  })

  describe('When its invoked with a Validation Error', () => {
    test('Then it should call the responses status method with a 400', () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      const expectedError = 400
      const error = new ValidationError({}, {})

      generalError(error, null, res, null)

      expect(res.status).toHaveBeenCalledWith(expectedError)
    })
  })
})
