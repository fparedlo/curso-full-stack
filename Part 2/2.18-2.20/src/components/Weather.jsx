import { useEffect, useState } from 'react'
import externalAPIService from '../services/externalAPIService'

const Weather = ({ capital }) => {
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)

  useEffect(() => {
    externalAPIService
      .fetchWeather(capital)
      .then(response => {
        setTemperature(response.data.data.values.temperature)
        setWind(response.data.data.values.windSpeed)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <>
      <li><strong>Weather in {capital}</strong></li>
      <li>temperature {temperature} Celsius</li>
      <li>wind {wind} m/s</li>
    </>
  )
}

export default Weather
