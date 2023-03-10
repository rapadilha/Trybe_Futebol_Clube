export default interface MatchesBody {
  getMatches(): Promise<object | string>
  getInProgress(props: string | undefined): Promise<object | string>
  createMatch(props: CreateMatch): Promise<object | string>
  finishMatch(props: string): Promise<object>
  validateToken(props: string): Promise<boolean | string>
  updateMatchGoals(props: string, body: CreateMatch): Promise<object>
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
