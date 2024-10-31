import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person, deleteThePerson }) => {
  const label = 'delete'

  return (
    <div>{person.name} {person.number} <button onClick={deleteThePerson}>{label}</button> </div>
  )
}

const Filter = (props) => {
  return (
    <div> filter shown with
      <input  type={props.type}
              value={props.value}
              onChange={props.onChange}/>
    </div>
  )
}

const Field = ({ field, value, onChange }) => {
  return (
      <div>
        {field}: <input value={value} onChange={onChange} />
      </div>
  )
}

const PersonForm  = ({ newName, newNumber, handleNewName, handleNewNumber, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
    <Field field="name" value={newName} onChange={handleNewName} />
    <Field field="number" value={newNumber} onChange={handleNewNumber} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons =  ({ filteredPersons, deleteThePerson }) => {
  return (
    <>
      {filteredPersons.map(person =>
        <Person key={person.id} person={person} deleteThePerson={() => deleteThePerson(person.id)}/>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFilter] = useState('')

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
      id: String(persons.length + 1),
    }
    if (persons.some(item => item.name === newName))
      window.alert(`${newName} is already added to phonebook`)
    else{
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
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

    if (window.confirm(`Delete ${person.name}?`)){
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

  return (
    <div>
      <h2>Phonebook</h2>
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