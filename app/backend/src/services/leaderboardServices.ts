import matchesService from './matchesService';
import teamsService from './teamsService';
import IMatches from '../database/interfaces/IMatches';
import IStatus from '../database/interfaces/IStatus';
import ILeaderboard from '../database/interfaces/ILeaderboard';
import ITeams from '../database/interfaces/ITeams';
import IGoals from '../database/interfaces/IGoals';
// import Matches from '../database/models/matchesModel';

export default class leaderboardService {
  static async getLeaderboard(): Promise<ILeaderboard[]> {
    const allMatches = await matchesService.getAll('false');
    const teams: ITeams[] = await teamsService.getAll();
    const tabela = this.dataTeams(teams, allMatches);
    return tabela;
  }

  static async dataTeams(teams: ITeams[], allMatches: IMatches[]): Promise<ILeaderboard[]> {
    const data: ILeaderboard[] = [];
    teams.forEach(async (team) => {
      const totalP = (await this.statsCount(team.id, allMatches));
      const totalG = (await this.gamesCount(team.id, allMatches));
      data.push({
        name: team.teamName,
        totalPoints: totalP.totalPoints,
        totalGames: totalG.totalGames,
        totalVictories: totalP.totalVictories,
        totalDraws: totalP.totalDraws,
        totalLosses: totalP.totalLosses,
        goalsFavor: totalG.home,
        goalsOwn: totalG.away,
        goalsBalance: totalG.totalGoals,
        efficiency: totalP.eff,
      });
    });
    return data;
  }

  // Quant de jogos jogados
  static async gamesCount(id: number, matches: IMatches[]): Promise<IGoals> {
    const teamMatch = matches.filter((match) => match.homeTeamId === id);
    let count = 0;

    teamMatch.forEach(() => { count += 1; });
    let goalsOwn = 0;
    let goalsFavor = 0;
    let allGoals = 0;

    teamMatch.forEach((match) => {
      goalsOwn = match.homeTeamGoals;
      goalsFavor = match.awayTeamGoals;
      allGoals = match.homeTeamGoals - match.awayTeamGoals;
    });

    return { home: goalsOwn, away: goalsFavor, totalGoals: allGoals, totalGames: count };
  }

  // Conta Vitorias, derrotas e empates
  static async statsCount(id: number, matches: IMatches[]): Promise<IStatus> {
    const matchesTeam = matches.filter((match) => match.homeTeamId === id);
    let victory = 0;
    let draw = 0;
    let def = 0;
    let victoryPoints = 0;
    let drawPoints = 0;
    let total = 0;

    matchesTeam.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) { victory += 1; victoryPoints += 3; }
      if (match.homeTeamGoals === match.awayTeamGoals) { draw += 1; drawPoints += 1; }
      if (match.homeTeamGoals < match.awayTeamGoals) { def += 1; }
    });
    total = victoryPoints + drawPoints;
    const effi = Number(((total / (matchesTeam.length * 3)) * 100).toFixed(2));
    return ({
      totalVictories: victory, totalLosses: def, totalDraws: draw, totalPoints: total, eff: effi,
    });
  }
}
