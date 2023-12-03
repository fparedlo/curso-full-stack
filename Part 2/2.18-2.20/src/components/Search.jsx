const Search = ({ search, handleSearch }) => {
  return (
    <search>
        <input type="text" value={search} onChange={handleSearch} />
    </search>
  )
}

export default Search
