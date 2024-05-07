import React from "react"

const Age = ({handleSort}) => (
  <button className="btn btn-primary age" onClick={() => handleSort("age")} name="age">
    Age
  </button>
)

export default Age
