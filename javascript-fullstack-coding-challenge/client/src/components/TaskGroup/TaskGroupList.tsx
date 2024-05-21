import {GroupedTask} from "../../lib/types"

import {useMutation} from "@apollo/client"
import {
  ToggleTaskMutationVariables,
  ToggleTaskMutation,
  toggleTask as toggleTaskGql,
  getTasks,
  GetTasksQuery,
  GetTasksQueryVariables,
} from "../../graphql"
import {Task} from "../../schemaTypes"

interface TaskGroupListI {
  group: GroupedTask
  data: Task[]
}

const TaskGroupList = ({group, data}: TaskGroupListI) => {
  const [toggleTask] = useMutation<ToggleTaskMutation, ToggleTaskMutationVariables>(toggleTaskGql)

  const handleCheckboxChange = async (id: number) => {
    await toggleTask({
      variables: {
        toggleTaskInput: {
          taskId: id,
        },
      },
      update: (cache, {data}) => {
        if (data?.toggleTask) {
          const existingTasks = cache.readQuery<GetTasksQuery, GetTasksQueryVariables>({
            query: getTasks,
          })
          if (existingTasks) {
            const updatedTasks = existingTasks.tasks.map((task) =>
              task.id === id ? {...task, completedAt: task.completedAt ? null : new Date().toISOString()} : task
            )
            cache.writeQuery<GetTasksQuery, GetTasksQueryVariables>({
              query: getTasks,
              data: {tasks: updatedTasks},
            })
          }
        }
      },
    })
  }

  return (
    <div className="container">
      <div className="list-container">
        <div className="header">{group.group}</div>
        <hr />
        {group.tasks.map((task) => {
          const dependenciesCompleted = task.dependencyIds.every((id) =>
            data?.some((depTask) => depTask.id === id && depTask.completedAt !== null)
          )

          const isLocked = task.dependencyIds.length > 0 && !dependenciesCompleted

          return (
            <ul className="item-list">
              {isLocked ? (
                <li className="item">
                  <div className="item-content">
                    <img className="chevron" src={process.env.PUBLIC_URL + "/locked.svg"} alt="Not Found" />
                    <div className="text-content">
                      <h4 className="lock-header">Locked Task</h4>
                    </div>
                  </div>
                </li>
              ) : (
                <li className="item">
                  <div className="item-content">
                    <img
                      onClick={() => {
                        if (!task.completedAt) handleCheckboxChange(task.id)
                      }}
                      className="checkbox"
                      src={`${process.env.PUBLIC_URL}${task.completedAt ? "/completed.svg" : "/incomplete.svg"}`}
                      alt="Not Found"
                    />
                    <div className="text-content">
                      <h4 className={`task-item ${task.completedAt && "completed-task"}`}>{task.task}</h4>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default TaskGroupList
