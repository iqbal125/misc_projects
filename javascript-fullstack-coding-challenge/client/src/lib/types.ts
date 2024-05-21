import {Task} from "../schemaTypes"

export interface GroupedTask {
  group: string
  tasks: Task[]
}

export interface TasksGroupI {
  group: GroupedTask
}

export interface TaskItemI {
  task: string
  task_id: number
}
