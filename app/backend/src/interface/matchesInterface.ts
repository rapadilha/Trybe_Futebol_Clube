export default interface MatchesBody {
  getMatches(): Promise<object | string>
  getInProgress(props: string | undefined): Promise<object | string>
}
