import './App.css'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

function App() {
  
  const [supermarket, setSupermarket] = useState([])
  const [refresh, setRefresh] = useState(false)

  
  // const supermarktDelete = async (superId) => {
    //   try {
      //     const {deleteData} = await axios.delete(`/api/supermakt/${superId}`)
      //   } catch (error) {
        //     console.log(error)
        //   }
        // }
        
        const nameRef = useRef()
        const mitarbeiterRef = useRef()
        const filialenRef = useRef()
        
        const unsereAusleseFunction = async (e) => {
          e.preventDefault()
          console.log(nameRef.current.value)
          console.log(mitarbeiterRef.current.value)
          console.log(filialenRef.current.value)
          
          const supermarkt = {
            name: nameRef.current.value,
            mitarbeiter: mitarbeiterRef.current.value,
            filialen: filialenRef.current.value
          }
          
          const sendData = await axios.post("/api/supermarkt", supermarkt)
          console.log(sendData)
          setRefresh((prev) => !prev)
        }
        useEffect(()=> {
          const dataSupermarkt = async () => {
            const shop = await axios.get("/api/supermarkt")
            setSupermarket(shop.data)
          }
          dataSupermarkt()
        },[refresh])
        
  return (
    <>
      <form onSubmit={unsereAusleseFunction}>
        <input type="text" ref={nameRef} name='name' placeholder='name'/>
        <input type="number" ref={mitarbeiterRef} name='mitarbeiter' placeholder='mitarbeiter'/>
        <input type="number" ref={filialenRef} name='filialen' placeholder='filialen' />
        <button type='submit'>Submit</button>
      </form>

      {supermarket?.map(supermarket => 
      <div key={supermarket._id}>
        <h2>{supermarket.name}</h2>
        <p>{supermarket.mitarbeiter}</p>
        <p>{supermarket.filialen}</p>
        <img src={supermarket.image?.url} alt={supermarket.name} />
        <button onClick={() => supermarktDelete(supermarket._id)}>Delete</button>
      </div>
      )}
    </>
  )
}

export default App
