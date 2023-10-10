import { Response } from 'express'
import { generalError, notFoundError } from './errors'

describe('Given a notFoundError function', () => {
  describe('When its invoked', () => {
    it('it should call the next function with an error', () => {
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
      const error = undefined

      generalError(error, null, res, null)

      expect(res.status).toHaveBeenCalledWith(expectedError)
    })
  })
})
