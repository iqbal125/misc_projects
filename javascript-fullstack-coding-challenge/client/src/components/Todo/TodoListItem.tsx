import {Dispatch, SetStateAction} from "react"
import {TasksGroupI} from "../../lib/types"

interface TaskGroupListI extends TasksGroupI {
  setActiveTodo: Dispatch<SetStateAction<string>>
}

const TaskGroupListItem = ({group, setActiveTodo}: TaskGroupListI) => {
  const completedTasks = group.tasks.filter((task) => task.completedAt !== null).length

  return (
    <li className="item">
      <div className="item-content-todos" onClick={() => setActiveTodo(group.group)}>
        <img className="chevron" src={process.env.PUBLIC_URL + "/group.svg"} alt="Not Found" />
        <div className="text-content">
          <h4 className="item-header"> {group.group}</h4>
          <p className="item-subtext">
            Completed {completedTasks} of {group.tasks.length}
          </p>
        </div>
      </div>
    </li>
  )
}

export default TaskGroupListItem
