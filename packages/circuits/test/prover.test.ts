import { expect } from 'chai'
import { prover } from '../src'
import { IncrementalMerkleTree } from './utils'

const random = () => Math.floor(Math.random() * 1000000000)

describe(`Prover`, function () {
  this.timeout(30000)

  it('should generate a proof', async function () {
    const tree = new IncrementalMerkleTree(15)
    const index = 50
    for (let x = 0; x < 100; x++) {
      const leaf = random()
      tree.insert(leaf)
    }

    const treeProof = tree.createProof(index)
    const identitySecret = 12
    const pathElements = treeProof.siblings
    const identityPathIndex = treeProof.pathIndices
    const { publicSignals, proof } = await prover.genProof('samekh' as any, {
      identitySecret,
      pathElements,
      identityPathIndex,
    })
    expect(publicSignals).to.exist
    expect(proof).to.exist
  })

  it('should verify with a valid proof', async function () {
    const tree = new IncrementalMerkleTree(15)
    const index = 50
    for (let x = 0; x < 100; x++) {
      const leaf = random()
      tree.insert(leaf)
    }

    const treeProof = tree.createProof(index)
    const identitySecret = 12
    const pathElements = treeProof.siblings
    const identityPathIndex = treeProof.pathIndices
    const { publicSignals, proof } = await prover.genProof('samekh' as any, {
      identitySecret,
      pathElements,
      identityPathIndex,
    })

    const isValid = await prover.verifyProof(
      'samekh' as any,
      publicSignals,
      proof,
    )

    expect(isValid).to.be.true
  })
})
