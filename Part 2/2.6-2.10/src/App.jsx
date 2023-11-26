import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const recordName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    const duplicated = persons.filter(person => person.name.toLowerCase() === personObject.name.toLocaleLowerCase())

    if (duplicated.length === 0) {
      setPersons([...persons, personObject])
      setNewName('');
    }else {
      alert(`${personObject.name} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={recordName}>
        <label for="name">name:</label>
        <input id="name" value={newName} onChange={updateNewName}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p key={person.name}>{person.name}</p>)
      }
    </div>
  )
}

export default App

