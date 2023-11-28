import { useEffect, useState } from 'react'
import Search from './components/Search'
import NewEntry from './components/NewEntry'
import DisplayEntries from './components/DisplayEntries'
import entryService from './services/entryService'
import Notification from './components/Notification'

const App = () => {
  const [entries, setEntries] = useState([])
  const [newEntry, setNewEntry] = useState({ name: '', number: '' })
  const [showAll, setShowAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [errorBoolean, setErrorBoolean] = useState(false)
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

  const add = (event) => {
    event.preventDefault()

    const entryObject = {
      ...newEntry
    }

    if (entryService.isDuplicatedEntry(entries, entryObject)) {
      setErrorBoolean(true)
      setActionMessage('Entry already exists')
      setTimeout(() => {
        setActionMessage(null)
      }, 5000)
      return;
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
            if (response.status === 200) {
              setEntries(entries.map(entry => entry.id !== id ? entry : response.data))
              setNewEntry({ name: '', number: '' })
              setErrorBoolean(false)
              setActionMessage(`${entryObject.name} has been updated`)
              setTimeout(() => {
                setActionMessage(null)
              }, 5000)
              return;
            }

            if (response.status === 409) {
              setErrorBoolean(true)
              setActionMessage(response.message)
              setTimeout(() => {
                setActionMessage(null)
              }, 5000)
              setEntries(response.data)
            }
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
        if (response.status === 201) {
          setEntries(entries.concat(response.data))
          setNewEntry({ name: '', number: '' })

          setErrorBoolean(false)
          setActionMessage(`${entryObject.name} has been added`)
          setTimeout(() => {
            setActionMessage(null)
          }, 5000)
        }

        if (response.status === 409) {
          setErrorBoolean(true)
          setActionMessage(response.message)
          setTimeout(() => {
            setActionMessage(null)
          }, 5000)
          setEntries(response.data)
        }

      })

  }

  const doSearch = (event) => {
    setSearchTerm(event.target.value)
    setShowAll(false)
  }

  const remove = (id) => {
    if (window.confirm(`Are you sure you want to remove ${entries.find(entry => entry.id === id).name}?`)) {

      const name = entries.find(entry => entry.id === id).name
      entryService
        .removeEntry(id, name)
        .then(response => {
          if (response.status === 200) {
            setErrorBoolean(false)
            setActionMessage(response.message)
            setTimeout(() => {
              setActionMessage(null)
            }, 5000)
            setEntries(response.data)
          }

          if (response.status === 404) {
            setErrorBoolean(true)
            setActionMessage(response.message)
            setTimeout(() => {
              setActionMessage(null)
            }, 5000)
            setEntries(response.data)
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
        <Notification message={actionMessage} errorType={errorBoolean} />
        <NewEntry
          onSubmit={add}
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
