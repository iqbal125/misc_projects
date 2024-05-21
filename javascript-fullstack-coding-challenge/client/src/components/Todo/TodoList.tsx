import React, {useEffect, useState} from "react"
import {useQuery} from "@apollo/client"

import TaskGroupListItem from "./TodoListItem"
import {GroupedTask} from "../../lib/types"
import TaskGroupList from "../TaskGroup/TaskGroupList"
import {GetTasksDocument, GetTasksQuery, GetTasksQueryVariables} from "../../graphql"
import {Task} from "../../schemaTypes"

const TodoList = () => {
  const {loading, error, data} = useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument)
  const [groupedTasks, setGroupedTasks] = useState<GroupedTask[]>([])
  const [activeTodo, setActiveTodo] = useState<string>("")

  const transformData = (tasks: Task[]) => {
    const newGroupedTasks: GroupedTask[] = []

    tasks.forEach((task) => {
      let group = newGroupedTasks.find((g) => g.group === task.group)
      if (!group) {
        group = {group: task.group, tasks: []}
        newGroupedTasks.push(group)
      }
      group.tasks.push(task)
    })

    setGroupedTasks(newGroupedTasks)
  }

  useEffect(() => {
    if (data) transformData(data.tasks)
  }, [data])

  return (
    <div className="container">
      <div className="list_container">
        <div className="header">Things to Do</div>
        <hr />
        {loading && <p>Loading...</p>}
        {error && <p>Error :({error.message})</p>}
        {groupedTasks?.map((group) => (
          <React.Fragment>
            <ul className="item-list">
              <TaskGroupListItem group={group} setActiveTodo={setActiveTodo} />
            </ul>
            <hr />
          </React.Fragment>
        ))}
      </div>

      {groupedTasks?.map((group) => {
        if (group.group === activeTodo && data) return <TaskGroupList group={group} data={data.tasks} />
      })}
    </div>
  )
}

export default TodoList
