import Teams from '../database/models/teamsModel';
import ITeams from '../database/interfaces/ITeams';

export default class teamsService {
  static async getAll(): Promise<ITeams[]> {
    const allTeams: ITeams[] = await Teams.findAll();
    console.log('return todos os times', allTeams);
    return allTeams;
  }

  static async getTeamById(id: number): Promise<ITeams | null> {
    const team: ITeams | null = await Teams.findOne({ where: { id } });
    // console.log('return 1 time', team);
    return team;
  }
}
