import {
  AddRemoveTeammateFromTeamInterface,
  AddTeammateInterface,
  RealtorInterface,
  UpdateTeamInterface,
} from 'App/Shared/Interfaces/TeammateInterface'
import TeammateRepositoryInterface from '../Interfaces/TeammateRepositoryInterface'
import fs from 'fs/promises'
import Team from 'App/Models/Team'
import Teammate from 'App/Models/Teammate'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { TEAMMATE_ACTION_ENUM, TEAMMATE_STATUS_ENUM } from 'App/Shared/Enums/TeammateEnum'
import BadRequestException from 'App/Exceptions/BadRequestException'
import { DateTime } from 'luxon'

export default class TeammateRespositoryDataModel implements TeammateRepositoryInterface {
  public async getAllRealtors(): Promise<RealtorInterface[]> {
    try {
      const realtorData = await fs.readFile('realtor.json', 'utf8')
      const realtors = JSON.parse(realtorData).realtors as RealtorInterface[]
      return realtors
    } catch (error) {
      throw error
    }
  }

  public async createTeammate(payload: AddTeammateInterface): Promise<Team> {
    try {
      const team = await Team.create({
        name: payload.name,
        avatar: payload.avatar,
        userId: payload.userId,
      })

      const teammates = payload.realtorIds.map((realtorId) => ({
        teamId: team.id,
        realtorId,
        userId: payload.userId,
      }))
      for (const teammate of teammates) {
        await Teammate.firstOrCreate(
          { teamId: teammate.teamId, realtorId: teammate.realtorId, userId: teammate.userId },
          {}
        )
      }
      return team
    } catch (error) {
      throw error
    }
  }

  public async updateTeam(payload: UpdateTeamInterface): Promise<Team> {
    try {
      const team = await Team.query()
        .where('id', payload.id)
        .andWhere('user_id', payload.userId)
        .first()
      if (!team) throw new NotFoundException('Team record does not exist')

      team.name = payload.name || team.name
      team.avatar = payload.avatar || team.avatar
      await team.save()
      return team
    } catch (error) {
      throw error
    }
  }

  public async addRemoveTeammateFromTeam(
    payload: AddRemoveTeammateFromTeamInterface
  ): Promise<Teammate> {
    try {
      const team = await Team.query().where('id', payload.id).first()
      if (!team) throw new NotFoundException('Team record does not exist')
      if (payload.action === TEAMMATE_ACTION_ENUM.ADD) {
        const teammate = await Teammate.query()
          .where('realtor_id', payload.realtorId)
          .andWhere('team_id', team.id)
          .andWhere('user_id', team.userId)
          .first()
        if (teammate) throw new BadRequestException('Teammate already exists')
        const addTeammate = await Teammate.create({
          realtorId: payload.realtorId,
          teamId: team.id,
          userId: team.userId,
        })
        return addTeammate
      }

      if (payload.action === TEAMMATE_ACTION_ENUM.REMOVE) {
        const teammate = await Teammate.query()
          .where('realtor_id', payload.realtorId)
          .andWhere('team_id', payload.id)
          .andWhere('user_id', team.userId)
          .first()
        if (!teammate) throw new NotFoundException('Realtor does not exist in this team')
        if (teammate.status === TEAMMATE_STATUS_ENUM.INACTIVE)
          throw new BadRequestException('Teammate removed')
        teammate.status = TEAMMATE_STATUS_ENUM.INACTIVE
        teammate.deletedAt = DateTime.now()
        await teammate.save()
        return teammate
      }

      throw new BadRequestException('Invalid action')
    } catch (error) {
      throw error
    }
  }

  public async getMyTeammates(userId: string): Promise<Team> {
    try {
      const team = await Team.query()
        .where('user_id', userId)
        .preload('teammates', (query) => {
          query.preload('realtor')
          query.preload('team')
        })
        .first()
      if (!team) throw new NotFoundException('No team record found for user')
      return team
    } catch (error) {
      throw error
    }
  }
}
