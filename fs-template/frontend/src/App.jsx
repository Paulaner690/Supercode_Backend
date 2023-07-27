import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"

function App() {
  const [status, setStatus] = useState();
  const mySearch = ["one", "two"]
  const searchParams = new URLSearchParams({mySearch})
  console.log(searchParams.mySearch)

  useEffect(() => {
    // fetch("/api/status")
    //   .then((res) => res.json())
    axios.get(`/api/status?search=${mySearch}&other=bla`)// mySearch= undefined
      .then((data) => setStatus(data.status))
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, []);

  return <>API Status: {status}</>;
}

export default App;
