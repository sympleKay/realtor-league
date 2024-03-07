import Database from '@ioc:Adonis/Lucid/Database'
import NotFoundException from 'App/Exceptions/NotFoundException'
import League from 'App/Models/League'
import TeamLeague from 'App/Models/TeamLeague'
import UtilityRepositoryInterface from 'App/Repositories/Interfaces/UtilityRepositoryInterface'
import { LEAGUE_ENUM_TYPE } from 'App/Shared/Enums/LeagueEnum'

export default class UtilityRepositoryDataModel implements UtilityRepositoryInterface {
  public async topTeams(): Promise<TeamLeague[]> {
    try {
      const topTeams = await TeamLeague.query()
        .orderBy('points', 'desc')
        .limit(3)
        .preload('team', (team) => {
          team.preload('user', (user) => {
            user.select(['first_name', 'last_name'])
          })
        })
        .preload('league')
      return topTeams
    } catch (error) {
      throw error
    }
  }

  public async topLeagues(): Promise<TeamLeague[]> {
    try {
      const topLeagues = await TeamLeague.query()
        .where((query) => {
          query.preload('league', (league) => {
            league.where('is_active', true).andWhere('type', LEAGUE_ENUM_TYPE.PUBLIC)
          })
        })
        .groupBy('league_id')
        .orderByRaw('COUNT(*) DESC')
        .select(Database.raw('league_id, COUNT(*) as total_games'))
        .limit(3)
        .preload('league', (query) => {
          query.preload('creator', (query) => {
            query.select(['id', 'first_name', 'last_name'])
          })
          query.preload('teams')
        })
      return topLeagues
    } catch (error) {
      throw error
    }
  }

  public async getTeamLeaguePoint(leagueId: string, teamId: string): Promise<number> {
    try {
      const teamLeague = await TeamLeague.query()
        .where('league_id', leagueId)
        .andWhere('team_id', teamId)
        .sum('points as points')
        .first()

      if (!teamLeague) throw new NotFoundException('Team league record not found')

      return parseInt(teamLeague.points)
    } catch (error) {
      throw error
    }
  }

  public async getTeamLeagueRank(leagueId: string, teamId: string): Promise<number> {
    try {
      const teamRank = await TeamLeague.query()
        .select('team_id')
        .select(Database.raw('ROW_NUMBER() OVER (ORDER BY points DESC) AS rank'))
        .where('league_id', leagueId)
        .orderBy('points', 'desc')

      const rankOfTeam = teamRank.findIndex((team) => team.teamId === teamId) + 1

      return rankOfTeam
    } catch (error) {
      throw error
    }
  }

  public async getTeamLeaguesWon(teamId: string): Promise<number> {
    try {
      const leaguesWon = await League.query().where('winner', teamId)

      return leaguesWon.length
    } catch (error) {
      throw error
    }
  }

  public async getTeamLeagues(leagueId: string): Promise<League> {
    try {
      const league = await League.query()
        .where('id', leagueId)
        .preload('teams', (team) => {
          team.orderBy('points', 'desc')
          team.preload('team', (teamQuery) => {
            teamQuery.preload('user', (user) => {
              user.select(['id', 'first_name', 'last_name'])
            })
          })
        })
        .preload('creator', (query) => {
          query.select(['id', 'first_name', 'last_name'])
        })
        .preload('leagueWinner', (query) => {
          query.select('id', 'name')
        })
        .first()
      if (!league) throw new NotFoundException('League not found')
      return league
    } catch (error) {
      throw error
    }
  }

  public async getLeagueHistory(): Promise<League[]> {
    try {
      const leagues = await League.query()
        .where('is_active', false)
        .andWhereNotNull('winner')
        .preload('teams', (team) => {
          team.orderBy('points', 'desc')
          team.preload('team', (teamQuery) => {
            teamQuery.preload('user', (user) => {
              user.select(['id', 'first_name', 'last_name'])
            })
          })
        })
      return leagues
    } catch (error) {
      throw error
    }
  }
}
