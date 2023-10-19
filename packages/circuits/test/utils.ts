import { poseidon2 } from 'poseidon-lite'
import {
  IncrementalMerkleTree as zkIncrementalMerkleTree,
  Node,
} from '@zk-kit/incremental-merkle-tree'

export class IncrementalMerkleTree extends zkIncrementalMerkleTree {
  constructor(depth: number, zeroValue: Node = 0, arity: number = 2) {
    super(poseidon2, depth, zeroValue, arity)
  }
}

export { Node }
