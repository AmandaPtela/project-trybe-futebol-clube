import Matches from '../database/models/matchesModel';
import IMatches from '../database/interfaces/IMatches';

export default class teamsService {
  static async getAll(): Promise<IMatches[]> {
    const allMatches: IMatches[] = await Matches.findAll();
    // console.log('return todos os times', allMatches);
    return allMatches;
  }
}
