import matchesService from './matchesService';
import teamsService from './teamsService';
import IMatches from '../database/interfaces/IMatches';
import IStatus from '../database/interfaces/IStatus';
import ILeaderboard from '../database/interfaces/ILeaderboard';
import ITeams from '../database/interfaces/ITeams';
import IGoals from '../database/interfaces/IGoals';
// import Matches from '../database/models/matchesModel';

export default class leaderboardService {
  static async getLeaderboard(url: string): Promise<ILeaderboard[]> {
    const allMatches = await matchesService.getAll('false');
    const teams: ITeams[] = await teamsService.getAll();
    if (url === 'all') {
      const tabela = this.each('all', teams, allMatches);
      return (await tabela).sort(this.sortLeaderboard);
    }
    const tabela = this.each(url, teams, allMatches);
    return (await tabela).sort(this.sortLeaderboard);
  }

  static async each(url: string, teams: ITeams[], allMatches: IMatches[]): Promise<ILeaderboard[]> {
    const data: ILeaderboard[] = [];
    teams.forEach(async (team) => {
      const totalP = (await this.statsCount(url, team.id, allMatches));
      const totalG = (await this.gamesCount(url, team.id, allMatches));
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
  static async gamesCount(url: string, id: number, matches: IMatches[]): Promise<IGoals> {
    let teamMatch: IMatches[] = [];
    if (url === 'home') {
      teamMatch = matches.filter((match) => match.homeTeamId === id);
    }
    if (url === 'away') {
      teamMatch = matches.filter((match) => match.awayTeamId === id);
    }
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
  static async statsCount(url: string, id: number, matches: IMatches[]): Promise<IStatus> {
    let matchesTeam = matches.filter((match) => match.awayTeamId === id);
    if (url === 'home') { matchesTeam = matches.filter((match) => match.homeTeamId === id); }
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

  static sortLeaderboard(a: ILeaderboard, b: ILeaderboard) {
    return b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsFavor;
  }
}
