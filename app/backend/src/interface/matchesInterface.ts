export default interface MatchesBody {
  getMatches(): Promise<object | string>
  getInProgress(props: string | undefined): Promise<object | string>
  createMatch(props: CreateMatch): Promise<object>
  finishMatch(props: string): Promise<object>
}

interface CreateMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export { CreateMatch };
