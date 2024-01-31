import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ChangeUserPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    oldPassword: schema.string(),
    newPassword: schema.string(),
    confirmNewPassword: schema.string(),
  })

  public messages: CustomMessages = {}
}
