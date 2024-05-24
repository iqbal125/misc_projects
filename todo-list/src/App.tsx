import {useState} from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<Array<string>>([""])
  const [todoText, setTodo] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTodos([...todos, todoText])
    setTodo("")
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input name="todo" onChange={handleInputChange} value={todoText} />
      </form>
      {todos.map((todo) => (
        <div>{todo}</div>
      ))}
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
