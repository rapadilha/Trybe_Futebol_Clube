export default interface Login {
  email:string
  password:string
  role:string
}

interface ValidateBody{
  validateBody(props: Login): Promise<string>
  getRole(props: string): Promise<object | string | undefined>
}

interface Decoded {
  data:string
  iat:number
}

export { ValidateBody, Decoded };
