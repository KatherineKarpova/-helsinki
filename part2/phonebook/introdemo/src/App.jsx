import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // add new name to the persons array
  // copy the array first do not change it directly
  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    // create new name as a seperate object to check and set
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    console.log('new id:', personObject.id)
    // check if the new name is already in the persons array
    const nameExists = persons.some(person => person.name === newName)
    // alert message to user if true/match found
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      // copy array and append new name if false
      setPersons(persons.concat(personObject))
    }
    // reset to the default before event handler
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
        <Person key={person.id} person={person}/>
        )}
      </div>
    </div>
  )
}

export default App