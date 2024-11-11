import CountryName from './CountryName'
import PrintCountry from './PrintCountry'
import PrintWeather from './PrintWeather'

const Print =  ({filteredCountries, country, handleShow, weather}) => {
	if (country){
	  return(
		<div>
		  <PrintCountry country={country}/>
		  <PrintWeather weather={weather} capital={country.capital}/>
		</div>
	  )
	}
	if (filteredCountries.length > 10){
	  return(<>Too many matches, specify another filter</>)
	}
	return (
	  <>
		{filteredCountries.map(listOfNames =>
		  <CountryName key={listOfNames.ccn3} listOfNames={listOfNames} handleShow={handleShow}/>
		)}
	  </>
	)

  }

  export default Print
