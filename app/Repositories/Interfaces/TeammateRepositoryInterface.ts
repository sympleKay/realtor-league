import Team from 'App/Models/Team'
import Teammate from 'App/Models/Teammate'
import {
  AddRemoveTeammateFromTeamInterface,
  AddTeammateInterface,
  RealtorInterface,
  UpdateTeamInterface,
} from 'App/Shared/Interfaces/TeammateInterface'

export default interface TeammateRepositoryInterface {
  getAllRealtors(): Promise<RealtorInterface[]>
  createTeammate(payload: AddTeammateInterface): Promise<Team>
  updateTeam(payload: UpdateTeamInterface): Promise<Team>
  addRemoveTeammateFromTeam(payload: AddRemoveTeammateFromTeamInterface): Promise<Teammate>
  getMyTeammates: (userId: string) => Promise<Team[]>
}
