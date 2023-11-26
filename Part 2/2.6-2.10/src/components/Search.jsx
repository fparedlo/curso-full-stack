

const Search = ({ value, onChange }) => {
  return (
    <main>
      <search>
        <label htmlFor="query">Filter shown with</label>
        <input id="query" type="search" value={value} onChange={onChange} />
      </search>
    </main>
  )
}

export default Search