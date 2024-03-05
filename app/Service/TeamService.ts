import UtilityRepositoryDataModel from 'App/Repositories/DataModels/UtilityRepositoryDataModel'
import UtilityRepositoryInterface from 'App/Repositories/Interfaces/UtilityRepositoryInterface'

export class TeamService {
  private static utilityRepository: UtilityRepositoryInterface = new UtilityRepositoryDataModel()
  public static async getTopTeams() {
    try {
      const topTeams = await this.utilityRepository.topTeams()
      const data = topTeams.map((data) => ({
        id: data.id,
        name: data.team.name,
        avatar: data.team.avatar,
        teamId: data.team.id,
        league: data.league.name,
        manager: `${data.team.user.firstName} ${data.team.user.lastName}`,
      }))
      return {
        status: true,
        message: 'Top teams',
        data,
      }
    } catch (error) {
      throw error
    }
  }
}
