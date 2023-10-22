import { useState, useEffect } from 'react'
import { Client, cacheExchange, fetchExchange } from 'urql'
const APIURL =
  'https://api.studio.thegraph.com/query/55415/samekh-test/version/latest'

const query = `
  query {
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

const TransactionList = () => {
  const [ca, setCa] = useState('')
  const [data, setData] = useState('')
  const [records, setRecords] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await client.query(query).toPromise()
    setData(response.data.depositeds)
  }
  const handleChange = (event) => {
    setCa(event.target.value)
  }
  const getRecords = async () => {
    let tmp = []
    for (let i = 0; i < data.length; i++) {
      if (data[i]['account'] == ca.toLowerCase()) {
        tmp.push(data[i])
      }
    }
    setRecords(tmp)
    console.log('records:', records)
  }

  return (
    <>
      <div>
        <input
          type="text"
          // value={this.state.inputValue}
          onChange={handleChange}
          placeholder="CA"
        />
        <button
          onClick={() => {
            getRecords()
          }}
          className="custom-button"
        >
          Get CA Records
        </button>
      </div>
    </>
  )
}

export default TransactionList
