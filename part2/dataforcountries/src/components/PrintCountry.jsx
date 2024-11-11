const PrintCountry = ({ country }) => {
	return (
	  <div>
		<h1>{country.name.common}</h1>
		<div>
		  <div> capital {country.capital} </div><div> area {country.area} </div>
		</div>
		<h2>languages: </h2>
		<ul>
		  {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
		</ul>
		<figure style={{ margin: '0' }}>
		  <img src={country.flags.png}
			   alt={`flag of ${country.name.common}`}
			   style={{ display: 'block', maxWidth: '200px', height: 'auto', margin: '0' }}/>
		</figure>
	  </div>
	)
  }

  export default PrintCountry

