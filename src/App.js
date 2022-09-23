
import React, { useState } from 'react';
import './index.css';
// require('dotenv').config()
const api ={
  key:process.env.REACT_APP_API,
  base:"https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then(result =>{ 
        setWeather(result)
        setQuery('')
        console.log(result);
        })
    }
  }

  const dateBuilder =(d) => {

    let months =["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let days =["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
    
  }

  return (
    <div className="App ">
     <main>
      <div className='search-box'>
        <input type="text" 
        onChange={e =>setQuery(e.target.value)} 
        value= {query} onKeyPress={search}
        className='search-bar' placeholder='Search...'/>
      </div>

     {(typeof weather.main != "undefined") ? (
      <div>
      <div className='location-box'>
      <div className='location'>{weather.name}, {weather.sys.country}</div>
      <div className='date'>{dateBuilder(new Date())}</div>
      </div>

      <div className='weather-box'>
        <div className='temp'> {Math.round(weather.main.temp)}°C</div>
        <div className='weather'>{weather.weather[0].main}</div>
      </div>
      </div>
     ) : ('')}
     </main>
    </div>
  );
}

export default App;

// https://api.openweathermap.org/data/2.5weather?q=pakistan&unit=metric&APPID=a32b8578d8d64a0355fb54b7f73533b4