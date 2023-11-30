const Results = ({ filtered }) => {
  return (
    <>
      {
        filtered.length > 10 &&
        <p>To many results, specify another filter</p>
      }

      {
        filtered.length < 10 && filtered.length > 1 &&
        <ul>
          {
            filtered.map(country => <li key={country.population}>{country.name.common} <button>show</button></li>)
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
                  Object.entries(filtered[0].languages).map(([key, value]) => <li key={key}>{key} {value}</li>)
                }
              </ul>
            </li>
            <li>Flag: <img src={filtered[0].flags.svg} alt={filtered[0].flags.alt} width="100" /></li>
          </ul>
        </>
      }
    </>
  )
}

      export default Results
