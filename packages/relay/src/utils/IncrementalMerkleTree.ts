import { poseidon2 } from 'poseidon-lite'
import {
  IncrementalMerkleTree as zkIncrementalMerkleTree,
  Node,
} from '@zk-kit/incremental-merkle-tree'
import fs from 'fs'
import path from 'path'

export function replacer(key: string, value: any) {
  if (typeof value === 'bigint') {
    return value.toString() + 'n'
  }
  return value
}

export class IncrementalMerkleTree extends zkIncrementalMerkleTree {
  private storagePath: string

  constructor(depth: number, zeroValue: Node = 0, arity: number = 2) {
    super(poseidon2, depth, zeroValue, arity)
    this.load()
    this.storagePath = path.join(__dirname, './tree/merkleTree.json')
  }

  private load(): void {
    if (fs.existsSync(this.storagePath)) {
      const data = fs.readFileSync(this.storagePath, 'utf-8')
      // TODO: serialize the data and load in the tree
    }
  }

  public save(): void {
    const data = JSON.stringify(this, replacer)
    // const parsedData = JSON.parse(data, reviver)
    fs.writeFileSync(this.storagePath, data, 'utf-8')
  }
}

export { Node }
