export type Countries = {
  id: string
  name: string
  phoneCode: string
}

export type Culture = {
  id: string
  country: Countries
  currency: string
  language: string
}

export type Currencies = {
  id: string
  code: string
  decimal: number
  name: string
}

export type Languages = {
  id: string
  name: string
  translationColumn: string
}

export type User = {
  id: string
  name: string
  surname: string
  email: string
  phone: string
  culture: Culture
}

export type Version = {
  version: string
}
