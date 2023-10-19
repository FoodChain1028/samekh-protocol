import path from 'path'
import { Groth16Proof, PublicSignals, groth16 } from 'snarkjs'

const buildPath = '../build/'

export const prover = {
  genProof: async (circuitName: string, inputs: any): Promise<any> => {
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
  },

  verifyProof: async (
    circuitName: string,
    publicSignals: PublicSignals,
    proof: Groth16Proof,
  ): Promise<boolean> => {
    const vkey = require(path.join(buildPath, `${circuitName}_vkey.json`))
    return groth16.verify(vkey, publicSignals, proof)
  },
}
