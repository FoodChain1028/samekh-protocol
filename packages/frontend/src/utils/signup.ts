import { UserId } from '../contexts/User'

const signup = async (userId: UserId, url: string): Promise<boolean> => {
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
      return true
    } else {
      console.error('Error sending the request!', await res.text())
      return false
    }
  } catch (err) {
    console.error('Error: ', err)
    return false
  }
}

export { signup }
