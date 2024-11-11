import Field from './Field'

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

export default PersonForm

