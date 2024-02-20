import NotFoundException from 'App/Exceptions/NotFoundException'
import League from 'App/Models/League'
import LeagueRepositoryInterface from 'App/Repositories/Interfaces/LeagueRepositoryInterface'
import { LEAGUE_ENUM_TYPE, LeagueType } from 'App/Shared/Enums/LeagueEnum'
import { CreateLeagueInterface, UpdateLeagueInterface } from 'App/Shared/Interfaces/LeagueInterface'
import { HelperUtil } from 'App/Utils/HelperUtil'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LeagueRepositoryDataModel implements LeagueRepositoryInterface {
  public async create(payload: CreateLeagueInterface): Promise<League> {
    try {
      if (payload.type === LEAGUE_ENUM_TYPE.PRIVATE) {
        const code = HelperUtil.generateNumeric(4)
        const league = await League.create({ ...payload, code: await Hash.make(code) })
        return { ...league.toJSON(), code } as League
      }
      return await League.create(payload)
    } catch (error) {
      throw error
    }
  }

  public async update(payload: UpdateLeagueInterface): Promise<League> {
    try {
      const league = await League.query()
        .where('id', payload.id)
        .andWhere('created_by', payload.createdBy)
        .first()
      if (!league) throw new NotFoundException('League record does not exist')
      league.name = payload.name || league.name
      league.start = payload.start || league.start
      league.duration = payload.duration || league.duration
      league.size = payload.size || league.size
      league.region = payload.region || league.region
      league.type = payload.type || league.type

      await league.save()
      return league
    } catch (error) {
      throw error
    }
  }

  public async delete(id: string, userId: string): Promise<League> {
    try {
      const league = await League.query().where('id', id).andWhere('created_by', userId).first()
      if (!league) throw new NotFoundException('League record does not exist')
      league.deletedAt = DateTime.now()

      await league.save()
      return league
    } catch (error) {
      throw error
    }
  }

  public async getMyLeagues(userId: string): Promise<League[]> {
    try {
      const leagues = await League.query().where('created_by', userId)
      return leagues
    } catch (error) {
      throw error
    }
  }

  public async getAllLeagues(): Promise<League[]> {
    try {
      const leagues = await League.query()
      return leagues
    } catch (error) {
      throw error
    }
  }

  public async getByLeagueType(type: LeagueType): Promise<League[]> {
    try {
      const leagues = await League.query().where('type', type)
      return leagues
    } catch (error) {
      throw error
    }
  }
}
