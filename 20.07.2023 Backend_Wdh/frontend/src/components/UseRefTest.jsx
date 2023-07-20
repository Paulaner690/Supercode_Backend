import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const UseRefTest = () => {

    const inputRef = useRef()
    const divRef = useRef()

    const [refresh, setRefresh] = useState(true)
    const tier = useRef("katze")
    const tier2 = "katze"
    
    useEffect(()=> {
        console.log(tier)
        console.log(tier2)

        // console.log(inputRef.current?.value)
        // console.log(divRef)

    },[refresh])

    return ( 
        <div ref={divRef}>
            <input ref={inputRef} value="Das ist eine feste value"/>
            <button onClick={()=>setRefresh(prev => !prev)}>Refresh</button>
            <button onClick={()=>setRefresh(prev => !prev)}>Refresh values</button>
        </div>
     );
}
 
export default UseRefTest;