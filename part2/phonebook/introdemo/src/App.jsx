import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // add new name to the persons array
  // copy the array first do not change it directly
  const addNewName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    // create new name as a seperate object to check and set
    const nameObject = {
      name: newName,
    }
    // check if the new name is already in the persons array
    const nameExists = persons.some(person => person.name === newName)
    // alert message to user if true/match found
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      // copy array and append new name if false
      setPersons(persons.concat(nameObject))
    }
    // reset to the default before event handler
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
        <Person key={person.name} person={person}/>
        )}
      </div>
    </div>
  )
}

export default App