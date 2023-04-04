import ICreateMatches from '../database/interfaces/ICreateMatches';
import Matches from '../database/models/matchesModel';
import IMatches from '../database/interfaces/IMatches';
import Teams from '../database/models/teamsModel';
import IEditMatches from '../database/interfaces/IEditMatches';

export default class teamsService {
  static async getAll(query: string | undefined): Promise<IMatches[]> {
    const allMatches: IMatches[] = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] },
      },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    if (query === 'true') {
      const inProgress = allMatches.filter((i) => i.inProgress === true);
      return inProgress;
    }
    if (query === 'false') {
      const finished = allMatches.filter((i) => i.inProgress === false);
      return finished;
    }
    return allMatches;
  }

  static async finishMatch(id: number): Promise<IMatches | null> {
    const toFinish = await Matches.findByPk(id);
    await toFinish?.update({ inProgress: false });
    const finished = await Matches.findByPk(id);
    return finished;
  }

  static async updateMatch(id: number, change: IEditMatches): Promise<IMatches | null> {
    const toEdit = await Matches.findByPk(id);
    await toEdit?.update({
      homeTeamGoals: change.homeTeamGoals,
      awayTeamGoals: change.awayTeamGoals,
    });
    const updated = await Matches.findByPk(id);
    return updated;
  }

  static async createMatch(match: ICreateMatches): Promise<IMatches | null> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;
    const created = await Matches.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });
    console.log(created);
    return created;
  }
}
