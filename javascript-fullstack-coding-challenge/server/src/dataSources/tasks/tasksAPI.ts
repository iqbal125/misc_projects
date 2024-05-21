import {TaskModel} from "../../models/TaskModel"
import {TasksData} from "./tasksData"
import {DataSource} from "apollo-datasource"
import {ToggleTaskInput} from "../../schemaTypes"

export class TasksAPI extends DataSource {
  taskData: TasksData

  constructor() {
    super()
    this.taskData = new TasksData()
  }

  getTasks(): Promise<TaskModel[]> {
    return this.taskData.getTasks()
  }

  toggleTask(_toggleTaskInput: ToggleTaskInput): Promise<boolean> {
    return this.taskData.toggleTask(_toggleTaskInput)
  }
}
