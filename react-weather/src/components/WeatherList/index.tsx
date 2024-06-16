import React, {useState} from "react"
import {Weather, weatherData} from "../../data/weatherData"
import WeatherCard from "../WeatherCard"
import "./index.css"

const WeatherList: React.FC = () => {
  const [favorites, setFavorites] = useState<Weather[]>([])
  const [unit, setUnit] = useState<"C" | "F">("C")
  const [searchText, setSearchText] = useState("")
  const [weatherDataCity, setWeatherData] = useState(weatherData)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value
    setSearchText(event.target.value)
    const findArray = weatherData.filter((city) => city.city.toLowerCase().includes(searchText.toLowerCase()))
    if (findArray) setWeatherData(findArray)
  }

  const handleClearSearch = () => {
    setSearchText("")
  }

  const handleUnitChange = () => {
    const unitChange = unit === "C" ? "F" : "C"
    setUnit(unitChange)
  }

  const handleAddFavorite = (cityId: number) => {
    const favoriteFind = weatherData.filter((city) => city.id === cityId)

    console.log(favoriteFind)
    const favoritesArr = [...favorites, ...favoriteFind]
    setFavorites(favoritesArr)
  }

  const handleRemoveFavorite = (cityId: number) => {
    const favoriteRemove = favorites.filter((city) => city.id !== cityId)
    setFavorites(favoriteRemove)
  }

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleSearch}
            data-testid="search-input"
            value={searchText}
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {weatherDataCity.map((weather) => (
              <WeatherCard
                key={6}
                weather={weather}
                unit={unit}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorite={false}
              />
            ))}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {`${unit === "C" ? "Fahrenheit" : "Celsius"}`}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <WeatherCard
                key={6}
                weather={favorite}
                unit={unit}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorite={false}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WeatherList
