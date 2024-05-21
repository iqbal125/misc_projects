import * as Types from "../../schemaTypes"

import {TypedDocumentNode as DocumentNode} from "@graphql-typed-document-node/core"
export type GetTasksQueryVariables = Types.Exact<{[key: string]: never}>

export type GetTasksQuery = {
  __typename?: "Query"
  tasks: Array<{
    __typename?: "Task"
    id: number
    group: string
    task: string
    dependencyIds: Array<Types.Maybe<number>>
    completedAt?: Types.Maybe<string>
  }>
}

export const GetTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: {kind: "Name", value: "getTasks"},
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {kind: "Name", value: "tasks"},
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {kind: "Field", name: {kind: "Name", value: "id"}},
                {kind: "Field", name: {kind: "Name", value: "group"}},
                {kind: "Field", name: {kind: "Name", value: "task"}},
                {kind: "Field", name: {kind: "Name", value: "dependencyIds"}},
                {kind: "Field", name: {kind: "Name", value: "completedAt"}},
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>
