import { useState } from 'react'

const Person = ({ person }) => {
	return (
	  <div>{person.name} {person.number}</div>
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

const Persons =  ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map(person =>
        <Person key={person.id} person={person}/>
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas' , number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: String(persons.length),
      name: newName,
      number: newNumber,
    }
    if (persons.some(item => item.name === newName))
      window.alert(`${newName} is already added to phonebook`)
    else{
      setPersons(persons.concat(personObject))
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
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
