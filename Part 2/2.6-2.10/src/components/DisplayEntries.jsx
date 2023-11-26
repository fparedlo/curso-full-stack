const DisplayEntries = ({entries}) => {
  return (
    <main>
      {
        entries.map(entry => <p key={entry.id}>{entry.name} <strong>{entry.telf}</strong></p>)
      }
    </main>
  )
}

export default DisplayEntries;