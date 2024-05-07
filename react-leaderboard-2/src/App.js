import React from "react"
import "./App.css"
import LeaderBoard from "./Component/LeaderBoard"
import "h8k-components"
import {BrowserRouter, Route, Routes} from "react-router-dom"

const title = "SPA - LeaderBoard"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h8k-navbar header={title}></h8k-navbar>

        <Routes>
          <Route exact path="/" element={<LeaderBoard />} />
          <Route exact path="/rank" element={<LeaderBoard sortBy="rank" />} />
          <Route exact path="/age" element={<LeaderBoard sortBy="age" />} />
          <Route exact path="/points" element={<LeaderBoard sortBy="points" />} />
          <Route exact path="/name" element={<LeaderBoard sortBy="name" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
