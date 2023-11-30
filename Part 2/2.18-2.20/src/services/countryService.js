import axios from 'axios'
const URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const fetchAll = async () => {
  try {
    const request = await axios.get(URL)
    const response = await request
    return response
  } catch (e) {
    console.log(`fetchAll: ${e}`)
  }
}

export default { fetchAll }
