export default interface Login {
  email:string
  password:string
}

interface ValidateBody{
  validateBody(props: Login): Promise<string>
}

export { ValidateBody };
