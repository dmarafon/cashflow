import { first } from '@cf/shared'
import { pool } from './pool'
import { usePoolQuery } from './usePoolQuery'

jest.mock('./pool', () => ({
  pool: {
    query: jest.fn(),
  },
}))

jest.mock('@cf/shared', () => ({
  first: jest.fn(),
}))

describe('Given an usePoolQuery', () => {
  beforeAll(() => {
    const mockQueryResult = {
      rows: [{ result: 'mocked data' }],
      rowCount: 1,
      fields: [{ name: 'result' }],
    }

    const mockFirstResult = { result: 'mocked data' }

    ;(first as any).mockReturnValue(mockFirstResult)
    ;(pool.query as any).mockImplementation((_query, _extraData, callback) => {
      callback(null, mockQueryResult)
    })
  })

  it('should resolve with the correct result', async () => {
    const query = 'SELECT * FROM your_table'
    const result = await usePoolQuery(query, [])

    expect(result).toEqual({
      value: { result: 'mocked data' },
      count: 1,
      fields: [{ name: 'result' }],
    })
  })

  it('should reject with an error', async () => {
    const mockError = new Error('Mocked error')

    ;(pool.query as any).mockImplementation((_query, _extraData, callback) => {
      callback(mockError, null)
    })

    const query = 'SELECT * FROM your_table'

    try {
      await usePoolQuery(query, [])
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBe(mockError)
    }
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
