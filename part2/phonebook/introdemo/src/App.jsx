import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // Combined state for both name and number
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  const [search, setSearch] = useState('')

  // whenn input fields in person forms are submitted,
  // set values to the newPerson object
  const handleNewPerson = (event) => {
    // get value in input field based on the input name
    const {name, value} = event.target
    console.log(event.target);
    
    setNewPerson({
      ...newPerson,
      [name]: value
    })
  }

  // add new name to the persons array
  // copy the array first do not change it directly
  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    // create new name as a seperate object to check and set
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1,
    }
    console.log('new id:', personObject.id)
    // check if the new name is already in the persons array
    // alert message to user if true/match found
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
    }
    else {
      // copy array and append new name if false
      setPersons(persons.concat(personObject))
    }
    // reset to the default before event handler
    setNewPerson({ name: '', number: '' })
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  // regexp approach to search for consecutive letters case insensitive
  const filteredPersons = persons.filter(person =>
    new RegExp(`^${search}`, 'i').test(person.name)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm
      state={newPerson}
      onChange={handleNewPerson}
      onSubmit={addNewPerson}
      />
      <h3>Numbers</h3>
      <Persons array={search ? filteredPersons : persons}/>
    </div>
  )
}

export default App