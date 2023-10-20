/* eslint-disable react-hooks/rules-of-hooks */
import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree'
import { signup } from '../utils/signup'

const endpoint = process.env.REACT_APP_BACKEND_ENDPOINT

export interface UserId {
  secret: string
  index: number
}

class User {
  userId: UserId

  constructor(userId: UserId) {
    this.userId = userId
  }

  async signUp(): Promise<boolean> {
    const url: string = endpoint + 'signup'
    console.log(url)

    const isSucceeded: boolean = await signup(this.userId, url)
    return isSucceeded
  }

  // TODO: fetch Tree from backend
  // fetchTree: async (): Promise<IncrementalMerkleTree> => {

  // },

  // TODO: genProof based on Tree
  // genProof: async (
  //     circuitName: string,
  //     tree: IncrementalMerkleTree,
  //     index: number,
  // ): Promise<any> => {

  // }
}

export default User
