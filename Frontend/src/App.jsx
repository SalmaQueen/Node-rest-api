import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [state, setState] = useState('');
  const latRef=useRef(null);
  const lngRef=useRef(null);

try{
  useEffect(()=>{
    if( !lngRef.current || !latRef.current) return;
    let lng=lngRef.current.value;
    let lat=latRef.current.value;
      
    // axios.get('/ninjas?lng=' + lng + '&lat=' + lat)
    //handle success
   axios.get('http://localhost:5000/api/ninjas?lng=' + lng + '&lat=' + lat)

   .then((res)=>{
    console.log(res.data);

    setState(res.data.map((ninja, index) => (
      <li key={index}>
        <span className={ninja.obj.available}></span>
        <span className="name">{ninja.obj.name}</span>
        <span className="rank">{ninja.obj.rank}</span>
        {/* <span className="dist">{Math.floor(ninja.dis / 1000)} km</span> */}
      </li>
    )));

   })
.catch(err=>err.message);      
    

}, [])

}
catch(err){
  console.log(err.mesaage)
}


  return (
    <>
    <div>
      <form >
        <label htmlFor="lng">Enter Longtitude:</label>
        <br/>
        <input type="text" ref={lngRef} required/>
        <br/>
        <br/>

        <label htmlFor="lat">Enter Latitude</label>
        <br/>
       

        <input type="text" ref={latRef} required/>
        <br/>
        <button type="submit" >Find ninjas</button>

      </form>
      <ul>
      {state}

      </ul>
    </div>
      
    </>
  )
}

export default App;
