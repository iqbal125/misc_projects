import {gql} from "@apollo/client"

export const getTasks = gql`
  query getTasks {
    tasks {
      id
      group
      task
      dependencyIds
      completedAt
    }
  }
`
