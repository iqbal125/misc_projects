import * as Types from "../../schemaTypes"

import {TypedDocumentNode as DocumentNode} from "@graphql-typed-document-node/core"
export type ToggleTaskMutationVariables = Types.Exact<{
  toggleTaskInput: Types.ToggleTaskInput
}>

export type ToggleTaskMutation = {__typename?: "Mutation"; toggleTask: boolean}

export const ToggleTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {kind: "Name", value: "toggleTask"},
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {kind: "Variable", name: {kind: "Name", value: "toggleTaskInput"}},
          type: {kind: "NonNullType", type: {kind: "NamedType", name: {kind: "Name", value: "ToggleTaskInput"}}},
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {kind: "Name", value: "toggleTask"},
            arguments: [
              {
                kind: "Argument",
                name: {kind: "Name", value: "toggleTaskInput"},
                value: {kind: "Variable", name: {kind: "Name", value: "toggleTaskInput"}},
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ToggleTaskMutation, ToggleTaskMutationVariables>
