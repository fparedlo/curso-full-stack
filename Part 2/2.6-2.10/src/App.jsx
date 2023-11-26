import { useState } from 'react'
import initialPhones from "./data/initialPhones"

const App = () => {
  const [entries, setEntries] = useState([...initialPhones])
  const [newEntry, setNewEntry] = useState({ name: '', telf: '' })
  const newNameUpdate = (event) => {
    setNewEntry({ ...newEntry, name: event.target.value })
  }
  const newNumberUpdate = (event) => {
    setNewEntry({ ...newEntry, telf: event.target.value })
  }
  const addNewEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      ...newEntry,
      id: entries.length + 1,
    }

    const duplicatedName = entries.filter(entry => entry.name.toLowerCase() === entryObject.name.toLowerCase())
    const duplicatedTelf = entries.filter(entry => entry.telf.toLowerCase() === entryObject.telf.toLowerCase())

    if (duplicatedName.length > 0 || duplicatedTelf.length > 0) {
      alert(`${entryObject.name} or ${entryObject.telf} found in the phonebook`)
    } else {
      setEntries([...entries, entryObject])
      setNewEntry({ name: '', telf: '' })
    }
  }


  const [showAll, setShowAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const displayedEntries = showAll ? entries : entries.filter(entry => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const doSearch = (event) => {
    setSearchTerm(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <section>
        <header>
          <h1>PhoneBook</h1>
        </header>
        <main>
          <search>
            <label htmlFor="query">Filter shown with</label>
            <input id="query" type="search" value={searchTerm} onChange={doSearch} />
          </search>
        </main>
      </section>
      <section>
        <header>
          <h1>Add a new</h1>
        </header>
        <main>
          <form onSubmit={addNewEntry}>
            <label htmlFor="name">name:</label>
            <input id="name" type="text" value={newEntry.name} onChange={newNameUpdate} required />
            <label htmlFor="telf">Telephone:</label>
            <input id="telf" type="text" value={newEntry.telf} onChange={newNumberUpdate} required />
            <div>
              <button type="submit">add</button>
            </div>
          </form>
        </main>
      </section>
      <section>
        <header>
          <h1>Numbers</h1>
        </header>
        <main>
          {
            displayedEntries.map(entry => <p key={entry.id}>{entry.name} <strong>{entry.telf}</strong></p>)
          }
        </main>
      </section>

    </div>
  )
}

export default App

