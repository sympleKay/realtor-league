import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export interface RegisterUserInterface {
  email: string
  firstName: string
  lastName: string
  password: string
  frontendUrl: string
}

export interface LoginUserInterface {
  email: string
  password: string
  auth: AuthContract
}
