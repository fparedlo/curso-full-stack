import { useEffect, useState } from 'react'
import Search from './components/Search'
import NewEntry from './components/NewEntry'
import DisplayEntries from './components/DisplayEntries'
import entryService from './services/entryService'
import isDuplicatedNameService from './services/isDuplicatedNameService'
import isDuplicatedNumberService from './services/isDuplicatedNumberService'

const App = () => {
  const [entries, setEntries] = useState([])
  const [newEntry, setNewEntry] = useState({ name: '', number: '' })
  const newNameUpdate = (event) => {
    setNewEntry({ ...newEntry, name: event.target.value })
  }
  const newNumberUpdate = (event) => {
    setNewEntry({ ...newEntry, number: event.target.value })
  }

  const addNewEntry = (event) => {
    event.preventDefault()

    const entryObject = {
      ...newEntry,
      id: entries.length + 1
    }


    if (isDuplicatedNameService(entries, entryObject) || isDuplicatedNumberService(entries, entryObject)) {
      alert(`${entryObject.name} or ${entryObject.number} found in the phonebook`)
    } else {
      entryService
        .addEntry(entryObject)
        .then(response => {
          setEntries(entries.concat(response))
          setNewEntry({ name: '', number: '' })
        })
    }
  }



  useEffect(() => {
    entryService
      .initialDataFetch()
      .then(initialData => {
        setEntries(initialData)
      })
  }, [])

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
          valueTelf={newEntry.number}
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
