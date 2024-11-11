const CountryName = ({ listOfNames , handleShow}) => {
	return (
	  <div>
		{listOfNames.name.common}
		<button onClick={() => handleShow(listOfNames)}>show</button>
	  </div>
	)
  }

  export default CountryName

