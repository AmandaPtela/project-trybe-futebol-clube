import Matches from '../database/models/matchesModel';
import IMatches from '../database/interfaces/IMatches';
import Teams from '../database/models/teamsModel';

export default class teamsService {
  static async getAll(query: string | undefined): Promise<IMatches[]> {
    const allMatches: IMatches[] = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] },
      },
      { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    if (query === 'true') {
      const inProgress = allMatches.filter((i) => i.inProgress === true)
      return inProgress;
    }
    if (query === 'false') {
      const finished = allMatches.filter((i) => i.inProgress === false);
      return finished;
    }
    return allMatches;
  }
}
