import React, { useState } from 'react';
import './App.css'
//Text lng=-25.856077 lat=70.848447
function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [ninjas, setNinjas] = useState([]);

  const handleSearch = () => {
    // Fetch nearby ninjas from the backend API
    const maxDistance = 10000; // Maximum distance in meters

    fetch(`http://localhost:5000/api/ninjas/?lat=${latitude}&lng=${longitude}&maxDistance=${maxDistance}`)
      .then(response => response.json())
      .then(data => setNinjas(data))
      .catch(error => console.error(error));
  };

  return (
    <div className='wrapper'>
      <h1>Nearby Ninjas</h1>
     
      <div>
        <label>Longitude:</label>
        <input
          type="number"
          value={longitude}
          onChange={event => setLongitude(event.target.value)}
        />
      </div>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          value={latitude}
          onChange={event => setLatitude(event.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {ninjas.map(ninja => (
          <>
           <li key={ninja._id}>
            {ninja.name} 
            {/* - Distance: {ninja.distance} meters */}
          </li>
          <li>{ninja.rank}</li>

          </>
         
        ))}
      </ul>
    </div>
  );
}

export default App;

