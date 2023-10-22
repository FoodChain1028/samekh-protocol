import React, { useState, useRef, useEffect } from 'react'
import Banner from './Banner'
import { User } from '../contexts/User'
import { Client, cacheExchange, fetchExchange } from 'urql'
import {
    Container,
    TextField,
    Button,
    Box,
    Typography,
    Modal,
    Card,
    CardContent,
    Grid,
    IconButton
  } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const APIURL =
  'https://api.studio.thegraph.com/query/55415/samekh-test/version/latest'

const chainQuery = `
  query GetDepositeds($first: Int!, $orderBy: String!){
    depositeds(
        first: 1000
        orderBy: blockTimestamp
    ) {
        account
        totalDeposit
        transactionHash
        id
        blockTimestamp
    }
  }
`

const client = new Client({
  url: APIURL,
  exchanges: [cacheExchange, fetchExchange],
})

const truncateMiddle = (input: string, charsToShow: number, separator: string) => {
    const stringLength = input.length;
    if (stringLength <= charsToShow) return input;
    const halfLength = charsToShow / 2;
    return `${input.substr(0, halfLength - separator.length)}${separator}${input.substr(stringLength - halfLength + separator.length)}`;
}

interface Deposited {
  account: string
  totalDeposit: string // Assuming string type, adjust as necessary
  transactionHash: string
  id: string
  blockTimestamp: string // Assuming string type, adjust as necessary
}

const Dashboard: React.FC = () => {
  const [index, setIndex] = useState<number>(0)
  const [secret, setSecret] = useState<number>(0)
  const [success, setSuccess] = useState<boolean>(false)
  const [dataRender, setDataRender] = useState<boolean>(false)
  const [ca, setCa] = useState<string>('')
  const [data, setData] = useState<Deposited[]>([])
  const [records, setRecords] = useState<Deposited[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedRecord, setSelectedRecord] = useState<Deposited | null>(null)

  useEffect(() => {
    if (success) {
      setDataRender(true)
      setSuccess(false)
    }
  }, [success])

  const handleRecordClick = (record: Deposited) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  const handleQuery = async () => {
    const userId = {
      secret: secret,
      index: index,
    }
    const user = new User(userId)
    const account = await user.query()
    setCa(account)

    await fetchData()
    await getRecords(account)
    setSuccess(true)
  }

  const fetchData = async () => {
    const response = await client
      .query(chainQuery, {
        first: 1000,
        orderBy: 'blockTimestamp',
      })
      .toPromise()
    console.log(response.data.depositeds)

    setData(response.data.depositeds)
  }

  const getRecords = async (account: string) => {
    let tmp: Deposited[] = []
    console.log(account)

    for (let i = 0; i < data.length; i++) {
      if (data[i]['account'] === account.toLowerCase()) {
        tmp.push(data[i])
      }
    }
    setRecords(tmp)
    console.log(tmp)

    console.log('records:', records)
  }

  return (
    <>
    <Banner />
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Type In Your Info to Query
      </Typography>
      <TextField
        label="Index"
        variant="outlined"
        onChange={(e) => setIndex(parseInt(e.target.value))}
        style={{ marginBottom: '16px', width: '100%' }}
      />
      <TextField
        type="password"
        label="Secret"
        variant="outlined"
        onChange={(e) => setSecret(parseInt(e.target.value))}
        style={{ marginBottom: '16px', width: '100%' }}
      />
      <Button variant="contained" color="primary" onClick={handleQuery}>
        Query for your records
      </Button>
      {
        dataRender && (
          <div>
            <Typography variant="h6">Your Contract Account Address: {ca}</Typography>
            {records.map((record, index) => (
              <Box
                key={index}
                sx={{ border: '1px solid #ccc', padding: '16px', marginTop: '16px', cursor: 'pointer' }}
                onClick={() => handleRecordClick(record)}
              >
                <Typography>Block Timestamp: {record.blockTimestamp}</Typography>
              </Box>
            ))}
          </div>
        )
      }

<Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <CardContent>
              <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                Record Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>ID: {truncateMiddle(selectedRecord?.id || '', 20, '...')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Block Timestamp: {selectedRecord?.blockTimestamp}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Total Deposit: {selectedRecord?.totalDeposit}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Transaction Hash: {truncateMiddle(selectedRecord?.transactionHash || '', 20, '...')}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Modal>
    </Container>
    </>
  );
}

export default Dashboard
