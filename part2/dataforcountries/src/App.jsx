import { useState, useEffect } from 'react'

import countryService from './services/countries'
import weatherService from './services/weather'

import Filter from './components/Filter'
import Print from './components/Print'

const App = () => {
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
