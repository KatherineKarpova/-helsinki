import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  // Combined state for both name and number
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')
  //fetch data from json server when persons[] changes
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      console.log('initial persons data fetched')
    })
  }, [])

  // add new name to the persons array
  // copy the array first do not change it directly
  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    // create new name as a seperate object to check and set
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    }
    // check if the new name is already in the persons array
    // alert message to user if true/match found
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
    }
    else {
      // if false copy array and append new name in backend
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        // reset to the default before event handler
        setNewPerson({ name: '', number: '' })
        console.log('person added!')
      })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id))
      })
      console.log('person deleted!')
    }
  }

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
      <Persons array={search ? filteredPersons : persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App