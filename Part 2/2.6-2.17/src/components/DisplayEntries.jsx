const DisplayEntries = ({ entries, removeEntry }) =>
  <main>
    {
      entries.map(entry =>
        <div className="grid" key={entry.id}>
          {entry.name} <strong>{entry.number}</strong>
          <button onClick={()=>removeEntry(entry.id)}>Delete</button>
        </div>
      )
    }
  </main>

export default DisplayEntries
