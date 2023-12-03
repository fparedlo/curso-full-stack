import { useEffect } from 'react'
import Weather from './Weather'

const Results = ({ filteredCountries, modifyFilteredCountries, search }) => {
  useEffect(() => {
  }, [search, filteredCountries])

  if (filteredCountries.length > 10 && search.length > 0) {
    return (
      <p>To many results, specify another filter</p>
    )
  }

  if (filteredCountries.length > 1 &&
    filteredCountries.length < 10) {
    return (
      <ul>
        {
          filteredCountries.map(country =>
            <li className="grid" key={country.population}>
              {country.name.common}
              <button onClick={() => modifyFilteredCountries(country)}>Show</button>
            </li>
          )
        }
      </ul>
    )
  }

  if (filteredCountries.length === 0 && search.length !== 0) {
    return (
      <p>No results found</p>
    )
  }

  if (search.length === 0) {
    return null
  }

  if (filteredCountries.length === 1) {
    return (
      <>
        <h3>{filteredCountries[0].name.common}</h3>
        <ul>
          <li>Area: {filteredCountries[0].area}</li>
          <li>Languages:
            <ul>
              {
                Object.entries(filteredCountries[0].languages).map(([key, value]) => <li key={key}>{value}</li>)
              }
            </ul>
          </li>
          <li>Flag: <img src={filteredCountries[0].flags.svg} alt={filteredCountries[0].flags.alt} width="100" />
          </li>
          <Weather capital={filteredCountries[0].capital[0]} />
        </ul>

      </>
    )
  }
}

export default Results
