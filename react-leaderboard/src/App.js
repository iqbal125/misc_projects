import React, {Component} from "react"
import Age from "./components/Age"
import Name from "./components/Name"
import Points from "./components/Points"
import Rank from "./components/Rank"
import Table from "./components/Table"

import {userData} from "./data"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersData: userData,
    }
  }

  handleSort = (key) => {
    let newArr = this.state.usersData.sort((a, b) => a[`${key}`] - b[`${key}`])
    this.setState(newArr)
  }

  render() {
    return (
      <div className="text-center buttons">
        <header className="text-center">
          <h1>Leaderboard</h1>
        </header>
        <div className="text-center buttons">
          <Age handleSort={this.handleSort}></Age>
          <Name handleSort={this.handleSort}></Name>
          <Points handleSort={this.handleSort}></Points>
          <Rank handleSort={this.handleSort}></Rank>
        </div>
        <div className="text-center buttons">
          <Table usersData={userData}></Table>
        </div>
      </div>
    )
  }
}
