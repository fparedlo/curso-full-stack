import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newTelf, setNewTelf] = useState(null)

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateNewTelf = (event) => {
    setNewTelf(event.target.value)
  }

  const recordName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      telf: newTelf 
    }
    const duplicatedName = persons.filter(person => person.name.toLowerCase() === personObject.name.toLocaleLowerCase())
    const duplicatedTelf = persons.filter(person => person.telf === personObject.telf)

    if (duplicatedName.length === 0 && duplicatedTelf.length === 0) {
      setPersons([...persons, personObject])
      setNewName('');
      setNewTelf(null);
    }else {
      if(duplicatedName.length > 0){
        alert(`${personObject.name} is already added to phonebook`)
      }else {
        alert(`${personObject.telf} is already added to phonebook`)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={recordName}>
        <label for="name">name:</label>
        <input id="name" value={newName} onChange={updateNewName} required/>
        <label for="telf">Telephone:</label>
        <input id="telf" type='number' value={newTelf} onChange={updateNewTelf} required/>
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

