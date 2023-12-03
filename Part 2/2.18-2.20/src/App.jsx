import { useEffect, useState } from 'react'
import fetchService from './services/externalAPIService'
import Results from './components/Results.jsx'
import apis from './apis/apis.js'
import Search from './components/Search.jsx'

function App () {
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const handleSearch = (event) => setSearch(event.target.value)

  useEffect(() => {
    fetchService
      .fetchCountries(apis.countries)
      .then(({ data }) => {
        setCountries(data)
      })
  }, [])

  useEffect(() => {
    if (search.length > 0) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredCountries(results)
    } else {
      setFilteredCountries(countries)
    }
  }, [search])

  const modifyFilteredCountries = (country) => {
    setFilteredCountries([country])
  }

  return (
    <>
      <h1>Search County</h1>
      <Search search={search} handleSearch={handleSearch} />

      <h2>Results</h2>
      <Results filteredCountries={filteredCountries} modifyFilteredCountries={modifyFilteredCountries} search={search} />
    </>
  )
}

export default App
