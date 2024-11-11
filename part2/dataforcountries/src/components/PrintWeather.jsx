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

  export default PrintWeather

