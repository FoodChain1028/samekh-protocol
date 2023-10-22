import { signup, execute } from '../utils'

const endpoint = process.env.REACT_APP_BACKEND_ENDPOINT

export interface UserId {
  secret: number | BigInt
  index: number
}

export class User {
  readonly userId: UserId

  constructor(userId: UserId) {
    this.userId = userId
  }

  async signUp(): Promise<number> {
    const url: string = endpoint + 'signup'
    const index: number = await signup(this.userId, url)
    return index
  }

  setIndex(index: number): void {
    this.userId.index = index
  }

  async execute(): Promise<any> {
    const url: string = endpoint + 'execute'
    const res = await execute(this.userId, url)
    return res
  }
}

export default User
