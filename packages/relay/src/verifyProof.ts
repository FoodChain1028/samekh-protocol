import path from 'path'
import { Groth16Proof, PublicSignals, groth16 } from 'snarkjs'
import { poseidon2 } from 'poseidon-lite'
import {
  IncrementalMerkleTree as zkIncrementalMerkleTree,
  Node,
} from '@zk-kit/incremental-merkle-tree'

const buildPath = '../../circuits/build/'

export const verifyProof = async (
  circuitName: string,
  publicSignals: PublicSignals,
  proof: Groth16Proof,
): Promise<boolean> => {
  const vkey = require(path.join(buildPath, `${circuitName}_vkey.json`))
  return groth16.verify(vkey, publicSignals, proof)
}

export const genProof = async (
  circuitName: string,
  inputs: any,
): Promise<any> => {
  const circuitWasmPath = path.join(
    __dirname,
    buildPath,
    `/${circuitName}.wasm`,
  )
  const zkeyPath = path.join(__dirname, buildPath, `${circuitName}.zkey`)
  const { publicSignals, proof } = await groth16.fullProve(
    inputs,
    circuitWasmPath,
    zkeyPath,
  )

  return { publicSignals, proof }
}

export class IncrementalMerkleTree extends zkIncrementalMerkleTree {
  constructor(depth: number, zeroValue: Node = 0, arity: number = 2) {
    super(poseidon2, depth, zeroValue, arity)
  }
}

export { Node }
