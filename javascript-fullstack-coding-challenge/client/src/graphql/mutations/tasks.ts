import {gql} from "@apollo/client"

export const toggleTask = gql`
  mutation toggleTask($toggleTaskInput: ToggleTaskInput!) {
    toggleTask(toggleTaskInput: $toggleTaskInput)
  }
`
