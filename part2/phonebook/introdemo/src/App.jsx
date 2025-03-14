import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import SuccessNotification from './components/SuccessNotification'
import personService from './services/persons'
import ErrorNotification from './components/ErrorNotification'

const App = () => {

  const [persons, setPersons] = useState([])
  // Combined state for both name and number
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const oldPerson = persons.find(person => person.name === newPerson.name)
        personService.update(oldPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id === oldPerson.id ? returnedPerson : person)))
          setSuccessMessage(`Updated ${oldPerson.name}'s phone number! :)`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          console.log('success message set')
        })
        .catch((error) => {
          setErrorMessage(`Information of '${oldPerson.name}' has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }
    else {
      // if false copy array and append new name in backend
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        // reset to the default before event handler
        setNewPerson({ name: '', number: '' })
        setSuccessMessage(`Added ${personObject.name}! :)`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        console.log('person added!')
      })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
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
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
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