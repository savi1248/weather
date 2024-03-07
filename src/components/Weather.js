import { useEffect, useState } from "react";
import Search from "./Search";
export default function Weather() {
    const [search, setSearch] = useState("")
     const [loading,setLoading]= useState(false);
      const[weatherData, setWeatherData]= useState(null)

      async function fetchWeatherData(param) {
        setLoading(true);
        try {
          const response = await fetch(
          `  https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=37a191db5fbf97ea404007edf42d9643`
          );
    
          const data = await response.json();
          if (data) {
            setWeatherData(data);
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
          console.log("do not found");
        }
      }
    
      async function handleSearch() {
        fetchWeatherData(search);
      }
      function getCurrentDate(){
        return new Date().toLocaleDateString('en-us',{
            weekday: 'long',
            month:'long',
            day:'numeric',
            year:"numeric"
        })
      }

      useEffect(()=>{
        fetchWeatherData('Chennai');
      },[])
      console.log(weatherData);
      
    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
             {
             loading ? <div className="loading">loading...</div> :
             <div>
                    <div className="city-name">
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}
                            </span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">{weatherData?.main?.temp}°C</div>
                    <p className="description">
                        {weatherData &&  weatherData.weather && weatherData.weather[0] ?  weatherData.weather[0].description : ''} 
                    </p>
                    <div className="weather-info">
                        <div className="column">
                            <div>
                                <p className="wind">{weatherData?.wind?.speed} km/h</p>
                                <h2> Wind speed</h2>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}%</p>
                                <h2>Humidity</h2>
                            </div>
                        </div>
                    </div>
                    </div>
             }
        
        </div>
    )
            }