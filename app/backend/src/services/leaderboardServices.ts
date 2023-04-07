import Teams from '../database/models/teamsModel';
// import ITeams from '../database/interfaces/ITeams';
import teamsService from './matchesService';
import IMatches from '../database/interfaces/IMatches';
// import Matches from '../database/models/matchesModel';

export default class leaderboardService {
  static async getLeaderboard(): Promise<IMatches[]> {
    const allMatches = await teamsService.getAll('false');
    const teams = (await Teams.findAll()).map((t) => t.id);
    const partidas = allMatches.filter((matches) => matches.homeTeamId);
    console.log(partidas, teams);
    // FAZER O QUADRO DE COISA DE CADA TIME .MAP
    /* {
     'name': matches.
     'totalPoints': matches.homeTeamGoals * 3,
     'totalGames': total de jogos,
     'totalVictories': numero de vitorias,
     'totalDraws': Empates,
     'totalLosses': derrotas,
     'goalsFavor': gols contra ( a favor),
     'goalsOwn': gols sofridos,
     'goalsBalance': total de gols;
     'efficiency': aproveitamento do time; APENAS 2 CASAS DECIMAIS
   } });

   1 vitoria = 3 pontos
   1 derrota = 0 pontos
   1 empate = 1 ponto pra cada

   Aproveitamento do time; ( [Pontos totais / (Total de jogos * 3)] * 100)
   Saldo de gols = Gols marcados - Gols sofridos; */
    return partidas;
  }
}
