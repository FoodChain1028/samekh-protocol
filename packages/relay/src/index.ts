import express from 'express'
import { IncrementalMerkleTree } from './verifyProof'
import { verifyProof, genProof } from './verifyProof'

// to break the cors policy
const cors = require('cors')
const corsOption = {
  origin: ['http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express()
app.use(cors(corsOption))
app.use(express.json())
const PORT = 5003

app.get('/', (req, res) => {
  res.send('Hello from Relay!')
})

const random = () => Math.floor(Math.random() * 100000)

// proof -> verify() -> tx
app.post('/api/verifyproof', async (req, res) => {
  console.log(req.body)
  // const isValid = await verifyProof('samekh', publicSignals, proof)
  // console.log(isValid);
  res.json({
    message: 'Hellllllllllo!',
  })
})

app.post('/api/signup', async (req, res) => {
  console.log(req.body)
  res.json({
    message: Boolean(true),
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
