import express from 'express'
import { IncrementalMerkleTree, replacer } from './utils/IncrementalMerkleTree'
import { prover } from './utils/prover'
import { poseidon1 } from 'poseidon-lite'

// to break the cors policy
const cors = require('cors')
const corsOption = {
  origin: ['http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
}

const tree = new IncrementalMerkleTree(15)
var index = 0

const app = express()
app.use(cors(corsOption))
app.use(express.json())
const PORT = 5003

app.get('/', (req, res) => {
  res.send('Hello from Relay!')
})

const random = () => Math.floor(Math.random() * 100000)

app.post('/api/signup', async (req, res) => {
  const { secret } = req.body
  const newUserId = poseidon1([secret])
  tree.insert(newUserId)
  tree.save()
  index += 1
  console.log('New User Inserted - ', 'index: ', index - 1)

  res.json({
    index: index - 1,
  })
})

// proof --(1st step)-> verify() --(2nd step)--> tx
app.post('/api/execute', async (req, res) => {
  // 1st step: verify the proof
  const { secret, index } = req.body
  const userIndex = index
  const treeProof = tree.createProof(userIndex)
  const identitySecret = poseidon1([secret])
  const pathElements = treeProof.siblings
  const identityPathIndex = treeProof.pathIndices
  const { publicSignals, proof } = await prover.genProof('samekh', {
    identitySecret,
    pathElements,
    identityPathIndex,
  })
  const isValid = await prover.verifyProof('samekh', publicSignals, proof)

  if (!isValid) {
    res.status(400).json({
      error: 'Invalid proof',
    })
  } else {
    // 2nd step: execute through this relayer
    res.json({
      success: true,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
