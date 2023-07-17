import './App.css'
import { useState, useEffect } from 'react';
import axios from "axios"

const App = () => {
  const[todos, setTodos] = useState([])
  const [errors, setErrors] = useState({})// Errors sind Objekte!, daher leeres Objekt

  // use Effekt ist hier wie ein Beobachter 
useEffect(() => {
  const fetchTodos = async () => {
    try {
      // hier wird die Daten von der Datenbank geholt
      const res = await axios.get("/api/todos")
      console.log(res)
      // hier werden die Daten in die State gespeichert
      setTodos(res.data)
    } catch (error) {
      console.error("res funktioniert nicht")
    }
  }
  fetchTodos()
}, [])

const handleSubmit = async (e) => {
  e.preventDefault()
  // hier wird der Titel von der Form geholt
  const title = e.target.elements.todo.value
  try {
    // hier wird der Titel in die Datenbank gespeichert
    const res = await axios.post("/api/todos", { title })
    console.log(res.data)
    setTodos([...todos, res.data])
    e.target.reset()
  } catch (error) {
    setErrors(error.res.data.errors)
  }
}

const deleteTodo = async (id) => {
  try {
    axios.delete(`/api/todos/${id}`)
    // hier wird der Todo aus der State gelöscht und die Seite neu geladen
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  } catch (error) {
    console.error(error)
  }
}

const updateTodoHandle = async (id, completed) => {
  try {
    // hier wird der Todo in der Datenbank geupdatet
    await axios.put(`/api/todos/${id}`, { completed });
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {

        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(updateTodos);

  } catch (error) {
    console.error(error);
  }
};


  return ( 
    <>
    <h1>TODO LIST</h1>
      <form onSubmit={handleSubmit}>
        <input id='todo' type="text" />
        <small>{errors?.title?.message}</small>
        <br />
        <button type='submit'>Submit</button>
      </form>

      {todos?.map((todo) => {
        console.log(todo)
        return (

          <div className='myDiv' key={todo.id}>

            <input type="checkbox" onChange={(e) => updateTodoHandle(todo.id, e.target.checked)} checked={todo.completed} />

            <p className={todo.completed ? "completed" : ''}>{todo.title}</p>

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>

          </div>
        )

      })}

    </>
  )
}
 
export default App;