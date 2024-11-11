import Person from './Person'

const Persons =  ({ filteredPersons, deleteThePerson }) => {
	return (
	  <>
		{filteredPersons.map(person =>
		  <Person key={person.id} person={person} deleteThePerson={() => deleteThePerson(person.id)}/>
		)}
	  </>
	)
  }

export default Persons

