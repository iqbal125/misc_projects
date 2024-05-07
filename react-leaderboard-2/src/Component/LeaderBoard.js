import React from "react"
import {response} from "../response"
import {useParams} from "react-router"
import {Link} from "react-router-dom"

function LeaderBoard(props) {
  console.log(props)

  let sortList

  if (props.sortBy === "name") {
    sortList = response.list.sort((a, b) => a.name.localeCompare(b.name))
  } else if (props.sortBy === "age") {
    sortList = response.list.sort((a, b) => a.age - b.age)
  } else {
    sortList = response.list.sort((a, b) => a[`${props.sortBy}`] - b[`${props.sortBy}`])
  }

  return (
    <div className="text-center mt-50">
      <div>
        <div>
          <Link to="/rank">
            <button data-testid="route-rank" className="outlined" type="button">
              Rank
            </button>
          </Link>
          <Link to="/name">
            <button data-testid="route-name" className="outlined" type="button">
              Name
            </button>
          </Link>
          <Link to="/points">
            <button data-testid="route-points" className="outlined" type="button">
              Points
            </button>
          </Link>
          <Link to="/age">
            <button data-testid="route-age" className="outlined" type="button">
              Age
            </button>
          </Link>
        </div>
      </div>
      <div className="card mx-auto pb-20 mb-30" style={{width: "50%"}}>
        <table className="mt-50" data-testid="app-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th className="numeric">Points</th>
              <th className="numeric">Age</th>
            </tr>
          </thead>
          <tbody data-testid="app-tbody">
            {sortList.map(({rank, name, points, age}, index) => (
              <tr key={rank}>
                <td data-testid={`rank-${index}`}>{rank}</td>
                <td data-testid={`name-${index}`}>{name}</td>
                <td data-testid={`points-${index}`} className="numeric">
                  {points}
                </td>
                <td data-testid={`age-${index}`} className="numeric">
                  {age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderBoard
