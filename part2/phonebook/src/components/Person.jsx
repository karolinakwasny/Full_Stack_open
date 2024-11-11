const Person = ({ person, deleteThePerson }) => {
	const label = 'delete'

	return (
	  <div>{person.name} {person.number} <button onClick={deleteThePerson}>{label}</button> </div>
	)
  }


export default Person
