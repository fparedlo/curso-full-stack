import { useEffect, useState } from 'react'
import externalAPIService from '../services/externalAPIService'

const Results = ({ filtered }) => {
  const [showSingleItem, setShowSingleItem] = useState(null)

  useEffect(() => {
    setShowSingleItem(null)
  }, [filtered])

  const handleShow = (country) => {
    setShowSingleItem(country)
  }

  const capitalWeather = () => {
    // if(filtered.length === 1){
    externalAPIService
      .fetchWeather(filtered[0].capital[0])
      .then(data => console.log(data))
      .catch(err => console.log(err))
    // }
  }

  return (
    <>
      {
        filtered.length > 10 &&
        <p>To many results, specify another filter</p>
      }

      {
        filtered.length < 10 && filtered.length > 1 && !showSingleItem &&
        <ul>
          {
            filtered.map(country => <li className="grid" key={country.population}>{country.name.common} <button onClick={() => handleShow(country)}>Show</button></li>)
          }
        </ul>
      }

      {
        filtered.length === 1 &&
        <>
          <h3>{filtered[0].name.common}</h3>
          <ul>
            <li>Capital: {filtered[0].capital}</li>
            <li>Area: {filtered[0].area}</li>
            <li>Languages:
              <ul>
                {
                  Object.entries(filtered[0].languages).map(([key, value]) => <li key={key}>{value}</li>)
                }
              </ul>
            </li>
            <li>Flag: <img src={filtered[0].flags.svg} alt={filtered[0].flags.alt} width="100" /></li>
          </ul>
        </>
      }

      {
        showSingleItem &&
        filtered.filter(country => country.name.common === showSingleItem.name.common).map(country =>
          <div key={country.population}>
            <h3>{country.name.common}</h3>
            <ul>
              <li>Capital: {country.capital}</li>
              <li>Area: {country.area}</li>
              <li>Languages:
                <ul>
                  {
                    Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)
                  }
                </ul>
              </li>
              <li>Flag: <img src={country.flags.svg} alt={country.flags.alt} width="100" /></li>
              <li><h3>Weather in {country.capital}</h3></li>
              <li>Temperature <button onClick={() => capitalWeather()}>test</button></li>
            </ul>
          </div>
        )
      }
    </>
  )
}

export default Results
