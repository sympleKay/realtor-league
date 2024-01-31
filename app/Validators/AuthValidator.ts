import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class LoginUserAuthValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string(),
  })

  public messages: CustomMessages = {}
}

export class RegisterUserAuthValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string(),
    firstName: schema.string(),
    lastName: schema.string(),
    frontendUrl: schema.string(),
  })

  public messages: CustomMessages = {}
}

export class CompleteUserProfileAuthValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    phoneNumber: schema.string({}, [rules.unique({ table: 'users', column: 'phone_number' })]),
    address: schema.string(),
    avatar: schema.string(),
    profession: schema.string(),
  })

  public messages: CustomMessages = {}
}

export class VerifyUserEmailAuthValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    token: schema.string(),
  })

  public messages: CustomMessages = {}
}
