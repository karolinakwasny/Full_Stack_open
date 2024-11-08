import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = 'http://api.openweathermap.org'

  const getCoordinates = (capital) => {
    const request = axios.get(`${baseUrl}/geo/1.0/direct?q=${capital}&limit=1&appid=${apiKey}`)
    return request.then(response => response.data)
  }
  const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
  }

  export default { getCoordinates, getWeather }
