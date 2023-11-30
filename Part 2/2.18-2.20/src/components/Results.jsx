const Results = ({ filtered }) => {
  return (
    <>
      {
        filtered.length > 10 &&
        <p>To many results, specify another filter</p>
      }

      {
        (filtered.length < 10 && filtered.length > 1) &&
        <ul>
          {
            filtered.map(country => <li key={country.name.common}>{country.name.common}</li>)
          }
        </ul>
      }

      {
        filtered.length === 1 &&
        filtered.map(country => (
          <>
            <h3 key={country.name.common}>{country.name.common}</h3>
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
            </ul>
          </>
        )
        )
      }
    </>
  )
}

export default Results
