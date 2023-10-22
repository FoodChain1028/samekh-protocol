import { UserId } from '../contexts/User'

const execute = async (userId: UserId, url: string): Promise<number> => {
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
      const { success } = await res.json()
      return success
    } else {
      console.error('Error sending the request!', await res.text())
      return -1
    }
  } catch (err) {
    console.error('Error: ', err)
    return -1
  }
}

export { execute }
