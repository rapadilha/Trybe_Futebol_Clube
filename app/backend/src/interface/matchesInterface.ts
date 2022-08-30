export default interface MatchesBody {
  getMatches(): Promise<object | string>
}
