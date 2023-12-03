import axios from 'axios'
import apis from '../apis/apis'

const fetchCountries = async (url) => {
  try {
    const request = await axios.get(url)
    const response = await request
    return response
  } catch (e) {
    console.log(`fetchCountries: ${e}`)
  }
}

const fetchWeather = async (capital) => {
  const apiKey = import.meta.env.VITE_TOMORROW_IO
  const options = { method: 'GET', headers: { accept: 'application/json' } }
  try {
    const response = await axios.get(`${apis.weather}${capital}&apikey=${apiKey}`, options)
    return response
  } catch (e) {
    console.log(`fetchWeather: ${e}`)
  }
}

export default { fetchCountries, fetchWeather }
