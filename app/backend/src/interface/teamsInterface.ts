// export default interface Teams {
//   dataValues:object
// }

export default interface TeamsBody{
  getTeams(): Promise<object | string>;
  getTeamsId(props: string): Promise<object | string>;
}

// export { TeamsBody };
