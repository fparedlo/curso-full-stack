import { useEffect, useState } from 'react'
import Search from './components/Search'
import NewEntry from './components/NewEntry'
import DisplayEntries from './components/DisplayEntries'
import entryService from './services/entryService'

const App = () => {
  const [entries, setEntries] = useState([])
  const [newEntry, setNewEntry] = useState({ name: '', number: '' })
  const [showAll, setShowAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const entriesToShow = showAll ? entries : entries.filter(entry => entry.name.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    entryService
      .dataFetch()
      .then(initialData => {
        setEntries(initialData)
      })
  }, [])

  const newNameUpdate = (event) => {
    setNewEntry({ ...newEntry, name: event.target.value })
  }

  const newNumberUpdate = (event) => {
    setNewEntry({ ...newEntry, number: event.target.value })
  }

  const findAndUpdate = (entries, entryObject) => {
    const id = entries.find(entry => entry.name.toLowerCase() === entryObject.name.toLowerCase()).id
    entryService
      .updateEntry(id, entryObject)
      .then(response => {
        setEntries(entries.map(entry => entry.id !== id ? entry : response.data))
        setNewEntry({ name: '', number: '' })
      })
  }


  const addNewEntry = (event) => {
    event.preventDefault()

    const entryObject = {
      ...newEntry
    }

    if (entryService.isDuplicatedEntry(entries, entryObject)) {
      return alert('Entry already exists')
    }

    if (
      entryService.isDuplicatedName(entries, entryObject) &&
      entryService.isDuplicatedNumber(entries, entryObject) === false
    ) {
      if (window.confirm(`The name ${entryObject.name} is already in the phonebook, replace the old number with a new one?`)) {
        const id = entries.find(entry => entry.name.toLowerCase() === entryObject.name.toLowerCase()).id

        entryService
          .updateEntry(id, entryObject)
          .then(response => {
            setEntries(entries.map(entry => entry.id !== id ? entry : response))
            setNewEntry({ name: '', number: '' })
          })
      }
      return;
    }

    if (
      entryService.isDuplicatedName(entries, entryObject) === false &&
      entryService.isDuplicatedNumber(entries, entryObject)
    ) {
      return alert(`${entryObject.number} is already registered under another name, please review`);
    }

    entryService
      .addEntry(entryObject)
      .then(response => {
        setEntries(entries.concat(response))
        setNewEntry({ name: '', number: '' })
      })

  }

  const doSearch = (event) => {
    setSearchTerm(event.target.value)
    setShowAll(false)
  }

  const remove = (id) => {
    if (window.confirm(`Are you sure you want to remove ${entries.find(entry => entry.id === id).name}?`)) {
      entryService
        .removeEntry(id)
        .then(response => {
          if (response.status === 200) {
            entryService
              .dataFetch()
              .then(serveData => {
                setEntries(serveData)
              })
          }
        })
    }
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
        <DisplayEntries entries={entriesToShow} removeEntry={remove} />
      </section>

    </div>
  )
}

export default App
