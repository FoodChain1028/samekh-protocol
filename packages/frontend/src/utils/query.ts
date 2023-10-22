import { UserId } from '../contexts/User'

const query = async (userId: UserId, url: string): Promise<string> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    })

    if (res.ok) {
      console.log('Success!')
      const { account } = await res.json()
      return account
    } else {
      console.error('Error sending the request!', await res.text())
      return 'err'
    }
  } catch (err) {
    console.error('Error: ', err)
    return 'err'
  }
}

export { query }
