import './App.css'
import axios from "axios"
import UseRefTest from './components/UseRefTest';

function App() {

  const car = {
    model: "E-Klasse",
    color: "white",
    wheels: "4"
  }

  // const sendWithFetch = async () => {
  //   const res = await fetch("http://localhost:3001/api/v1/createCar", {
  //     method: "POST",
  //     headers: {
  //      "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(car)
  //   })
  //   const data = await res.json()
  //   console.log(data)
  // }
  // sendWithFetch()

  // const sendWithAxios = async () => {
  //   const res = await axios.post("http://localhost:3001/api/v1/createCar", car)
  //   console.log(res)
  // }
  // sendWithAxios()

  return (
    <>
     <UseRefTest/>
    </>
  )
}

export default App
