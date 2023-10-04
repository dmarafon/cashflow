import { first } from '@cf/shared'
import { FieldDef } from 'pg'
import { pool } from './pool'

type PoolQueryRes<T> = {
  value: T | undefined
  count: number | undefined
  fields: FieldDef[] | undefined
  error?: Error
}

export const usePoolQuery = <T>(query: string, extraData?: string[]) =>
  new Promise<PoolQueryRes<T>>((resolve, reject) =>
    pool.query<T>(query, extraData, (err, res) => {
      if (!err) {
        resolve({
          value: first(res.rows),
          count: res.rowCount,
          fields: res.fields,
        })

        return
      }

      reject(err)

      return {
        error: err,
      }
    })
  )
