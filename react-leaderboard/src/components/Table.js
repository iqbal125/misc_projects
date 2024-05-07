import React, {Component} from "react"

export default class Table extends Component {
  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr key="head">
              <th>Age</th>
              <th>Name</th>
              <th>Points</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {this.props.usersData.map((item) => (
              <tr key={`${item.rank}`}>
                <td>{item.age}</td>
                <td>{item.name}</td>
                <td>{item.points}</td>
                <td>{item.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
