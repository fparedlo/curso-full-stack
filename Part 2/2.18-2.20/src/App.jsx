import { useEffect, useState } from 'react'
import fetchService from './services/externalAPIService'
import Results from './components/Results.jsx'
import apis from './apis/apis.js'

function App () {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    fetchService
      .fetchCountries(apis.countries)
      .then(({ data }) => {
        setCountries(data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredCountries(results)
  }

  return (
    <>
      <h1>Search County</h1>
      <search>
        <input type="text" value={search} onChange={handleSearch} />
      </search>

      <h2>Results</h2>
      <Results filtered={filteredCountries} />
    </>
  )
}

export default App
