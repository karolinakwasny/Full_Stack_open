import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const CountryName = ({ listOfNames , handleShow}) => {
  return (
    <div>
      {listOfNames.name.common}
      <button onClick={() => handleShow(listOfNames)}>show</button>
    </div>
  )
}
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

const PrintWeather = ({ weather, capital }) => {
  if (!weather) {
    return <div>No weather data available.</div>
  }

  const temp = weather.main.temp
  const wind = weather.wind.speed
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {temp} Celcius</div>
      {iconUrl && (
        <img src={iconUrl} alt="Weather icon" style={{ width: '100px', height: 'auto' }} />
      )}
      <div>Wind {wind} m/s</div>
    </div>
  )
}

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

const Filter = (props) => {
  return (
    <div> find countries
      <input  type={props.type}
              value={props.value}
              onChange={props.onChange}/>
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState([])
  const [allCountires, setAllCountires] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then( countries => {
        setAllCountires(countries)
      })
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      if (!country) return setWeather(null)
      try {
        const coordinates = await weatherService.getCoordinates(country.capital)
        if (coordinates.length > 0) {
          const { lat, lon } = coordinates[0]
          const weatherData = await weatherService.getWeather(lat, lon)
          setWeather(weatherData)
        } else {
          setWeather(null)
        }
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setWeather(null)
      }
    }
    fetchWeather()
  }, [country])

  const handleShow = (selectedCountry) => {
    setCountry(selectedCountry)
  }

  const handleQuery = (event) => {
    const currQueryValue = event.target.value
    setQuery(currQueryValue)

    const filtered = allCountires.filter(oneCountry =>
      oneCountry.name.common.toLowerCase().includes(currQueryValue.toLowerCase())
    )
    setFilter(filtered)
    if (filtered.length === 1){
      setCountry(filtered[0])
    }else{
      setCountry(null)
    }
  }

  return (
    <div>
      <Filter type="text"
              value={query}
              onChange={handleQuery}/>
      <Print filteredCountries={filter}
             country={country}
             handleShow={handleShow}
             weather={weather}/>
    </div>
  )
}

export default App
