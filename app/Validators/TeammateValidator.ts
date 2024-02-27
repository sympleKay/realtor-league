import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TEAMMATE_ACTION_ENUM } from 'App/Shared/Enums/TeammateEnum'

export class CreateTeammateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    avatar: schema.string.optional(),
    realtorIds: schema
      .array()
      .members(
        schema.string({}, [rules.uuid(), rules.exists({ table: 'realtors', column: 'id' })])
      ),
  })

  public messages: CustomMessages = {}
}

export class UpdateTeamValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'teams', column: 'id' })]),
    name: schema.string.optional(),
    avatar: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}

export class AddRemoveTeammateFromTeamValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'teams', column: 'id' })]),
    realtorId: schema.string({}, [rules.uuid(), rules.exists({ table: 'realtors', column: 'id' })]),
    action: schema.enum(Object.values(TEAMMATE_ACTION_ENUM)),
  })

  public messages: CustomMessages = {}
}
