const DisplayEntries = ({ entries }) =>
  <main>
    {
      entries.map(entry => <p key={entry.id}>{entry.name} <strong>{entry.number}</strong></p>)
    }
  </main>


export default DisplayEntries;