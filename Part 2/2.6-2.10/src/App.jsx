import { useState } from 'react'
import initialPhones from "./data/initialPhones"
import Search from './components/Search'
import NewEntry from './components/NewEntry'
import DisplayEntries from './components/DisplayEntries'

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
  const entriesToShow = showAll ? entries : entries.filter(entry => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
        <Search value={searchTerm} onChange={doSearch} />
      </section>
      <section>
        <header>
          <h1>Add a new</h1>
        </header>
        <NewEntry
          onSubmit={addNewEntry}
          valueName={newEntry.name}
          onChangeName={newNameUpdate}
          valueTelf={newEntry.telf}
          onChangeNumber={newNumberUpdate} />
      </section>
      <section>
        <header>
          <h1>Numbers</h1>
        </header>
        <DisplayEntries entries={entriesToShow} />
      </section>

    </div>
  )
}

export default App

