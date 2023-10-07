import express from 'express'
import request from 'supertest'
import { usePoolQuery } from './usePoolQuery' // Replace with your actual module

jest.mock('./pool', () => {
  return {
    pool: {
      query: jest.fn(),
    },
  }
})

const app = express()

app.get('/example', async (_req, res) => {
  try {
    const result = await usePoolQuery('SELECT * FROM your_table')
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const mockPoolQuery = (mockCallback: any) => {
  const mockQuery = jest.fn(
    (query: string, values: any[], callback: (err: Error | null, result: any) => void) => {
      mockCallback(query, values, callback)
    }
  )
  require('./pool').pool.query = mockQuery
}

describe('usePoolQuery function', () => {
  it('should return a valid response for a successful query', async () => {
    mockPoolQuery(
      (query: string, _values: any[], callback: (err: Error | null, result: any) => void) => {
        const fakeResult = {
          rows: [{ id: 1, name: 'Test' }],
          rowCount: 1,
          fields: [],
        }
        callback(null, fakeResult)
      }
    )

    const response = await request(app).get('/example')
    expect(response.status).toBe(200)
    expect(response.body.value).toEqual({ id: 1, name: 'Test' })
  })

  it('should return an error for a failed query', async () => {
    mockPoolQuery(
      (_query: string, _values: any[], callback: (err: Error | null, result: any) => void) => {
        callback(new Error('Database error'), null)
      }
    )

    const response = await request(app).get('/example')
    expect(response.status).toBe(500)
    expect(response.body.error).toBe('Database error')
  })
})
