export default interface LeaderBorardBody {
  leaderBoard(): Promise<object>
}

interface LeadeBoard {
  name: string
  totalPoints: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: number
}

export { LeadeBoard };
