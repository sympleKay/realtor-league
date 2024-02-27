import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LEAGUE_ENUM_TYPE } from 'App/Shared/Enums/LeagueEnum'

export class CreateLeagueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    start: schema.date(),
    duration: schema.number(),
    size: schema.number(),
    region: schema.string(),
    type: schema.enum(Object.values(LEAGUE_ENUM_TYPE)),
  })

  public messages: CustomMessages = {}
}

export class UpdateLeagueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'leagues', column: 'id' })]),
    name: schema.string.optional({ trim: true }),
    start: schema.date.optional(),
    duration: schema.number.optional(),
    size: schema.number.optional(),
    region: schema.string.optional(),
    type: schema.enum(Object.values(LEAGUE_ENUM_TYPE)),
  })

  public messages: CustomMessages = {}
}

export class QueryLeagueByTypeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum(Object.values(LEAGUE_ENUM_TYPE)),
  })

  public messages: CustomMessages = {}
}

export class JoinLeagueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    code: schema.string.optional({}),
  })

  public messages: CustomMessages = {}
}
