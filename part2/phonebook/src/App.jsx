import { useState, useEffect } from 'react'
import personService from './services/persons'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, success: true })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const objectExists = persons.find(item => item.name === newName)

    if (objectExists){
      if (objectExists.number === newNumber){
        window.alert(`${newName} is already added to phonebook`)
      }
      else{
        changeTheNumber(objectExists.id)
      }
    }
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification({
            message: `Added ${newName} `,
            success: true,
          })
          setTimeout(() => {
            setNotification({ message: null, success: true })
          }, 5000)
        })
        .catch(error => {
          alert(`Failed to add '${personObject.name}'`);
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filtered.toLowerCase())
  )

  const deleteThePerson = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          })
          .catch(error => {
            alert(
              `the person '${person.name}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.id !== id))
          })
    }
  }

  const changeTheNumber = (id) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: newNumber}

    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
      personService
        .update(id, changedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map(n => n.id === id ? returnedPerson : n))
          setNotification({
            message: `${person.name} changed his/her number`,
            success: true,
          })
          setTimeout(() => {
            setNotification({ message: null, success: true })
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(n => n.id !== id))
          setNotification({
            message: `Information of ${person.name} has already been removed from the server`,
            success: false,
          })
          setTimeout(() => {
            setNotification({ message: null, success: true })
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} success={notification?.success} />
      <Filter type="text" value={filtered} onChange={handleSearch}/>
      <h3>add a new</h3>
      <PersonForm newName={newName}
                  newNumber={newNumber}
                  handleNewName={handleNewName}
                  handleNewNumber={handleNewNumber}
                  addPerson={addPerson}  />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deleteThePerson={deleteThePerson} />
    </div>
  )
}

export default App
