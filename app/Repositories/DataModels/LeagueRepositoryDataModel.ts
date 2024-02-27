import NotFoundException from 'App/Exceptions/NotFoundException'
import League from 'App/Models/League'
import LeagueRepositoryInterface from 'App/Repositories/Interfaces/LeagueRepositoryInterface'
import { LEAGUE_ENUM_TYPE, LeagueType } from 'App/Shared/Enums/LeagueEnum'
import {
  CreateLeagueInterface,
  JoinLeagueInterface,
  UpdateLeagueInterface,
} from 'App/Shared/Interfaces/LeagueInterface'
import { HelperUtil } from 'App/Utils/HelperUtil'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import BadRequestException from 'App/Exceptions/BadRequestException'
import TeamLeague from 'App/Models/TeamLeague'

export default class LeagueRepositoryDataModel implements LeagueRepositoryInterface {
  public async create(payload: CreateLeagueInterface): Promise<League> {
    try {
      // Check if start date is in the past
      if (payload.start <= DateTime.now().minus({ days: 1 })) {
        throw new BadRequestException('Start date can not be in past')
      }
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
  public async get(id: string): Promise<League> {
    try {
      const league = await League.query().where('id', id).preload('teams').first()
      if (!league) throw new NotFoundException('Invalid league id provided')
      return league
    } catch (error) {
      throw error
    }
  }

  public async joinLeague(payload: JoinLeagueInterface): Promise<TeamLeague> {
    try {
      const existingLeague = await TeamLeague.query()
        .where('team_id', payload.teamId)
        .andWhere('league_id', payload.leagueId)
        .first()
      if (existingLeague) throw new BadRequestException('You already joined this league')
      const teamLeague = await TeamLeague.create({
        teamId: payload.teamId,
        leagueId: payload.leagueId,
      })
      return teamLeague
    } catch (error) {
      throw error
    }
  }

  public async verifyPrivateLeagueCode(leagueId: string, code: string): Promise<boolean> {
    try {
      const league = await League.query().where('id', leagueId).first()
      if (!league) throw new NotFoundException('League record does not exist')
      return await Hash.verify(league.code, code)
    } catch (error) {
      throw error
    }
  }
}
