import React from "react"
import {Weather} from "../../data/weatherData"

interface WeatherCardProps {
  weather: Weather
  unit: "C" | "F"
  onAddFavorite: (cityId: number) => void
  onRemoveFavorite: (cityId: number) => void
  isFavorite: boolean
}

const WeatherCard: React.FC<WeatherCardProps> = ({weather, unit, onAddFavorite, onRemoveFavorite, isFavorite}) => {
  const handleFavoriteClick = () => {
    onAddFavorite(weather.id)
  }

  const handleRemoveClick = () => {
    onRemoveFavorite(weather.id)
  }

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}-${isFavorite ? "fav" : ""}`}>
      <td>{weather.city} </td>
      <td> {`${unit === "C" ? weather.temperature.toFixed(1) + "°C" : weather.temperature * (9 / 5) + 32 + "°F"} `}</td>

      <td>{weather.description}</td>
      <td>
        <button onClick={handleFavoriteClick} data-testid={`weather-card-action-${weather.id}`}>
          Add to favorites
        </button>
        <button onClick={handleRemoveClick} data-testid={`weather-card-action-${weather.id}`}>
          Remove from favorites
        </button>
      </td>
    </tr>
  )
}

export default WeatherCard
