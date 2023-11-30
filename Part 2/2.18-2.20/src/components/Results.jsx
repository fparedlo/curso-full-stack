const Results = ({data}) => {
  return(
    <>
      {
        data.length > 10 &&
          <p>To many results, specify another filter</p>
      }
      <ul>
        {
           (data.length < 10 && data.length > 1) && 
             data.map(country => <li key={country.name.common}>{country.name.common}</li>)
        }
      </ul>
      {
        data.length === 1 &&
          data.map(country => <p key={country.name.common}>SOLO UNO</p>)
      }
    </>
  )
}

export default Results