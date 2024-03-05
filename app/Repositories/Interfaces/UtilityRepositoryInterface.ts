import League from 'App/Models/League'
import TeamLeague from 'App/Models/TeamLeague'

export default interface UtilityRepositoryInterface {
  topTeams(): Promise<TeamLeague[]>
  topLeagues(): Promise<TeamLeague[]>
  getTeamLeaguePoint(leagueId: string, teamId: string): Promise<number>
  getTeamLeagueRank(leagueId: string, teamId: string): Promise<number>
  getTeamLeaguesWon(teamId: string): Promise<number>
  getTeamLeagues(leagueId: string): Promise<League>
  getLeagueHistory(): Promise<League[]>
}
