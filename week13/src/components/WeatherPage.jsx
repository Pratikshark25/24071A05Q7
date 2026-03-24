// 2083f2d80fe38433ed6d66779d8c4cba
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CurrentWeatherCard from './CurrentWeatherCard';
import WeatherChart from './WeatherChart';
import { getCurrentWeather, getForecastWeather } from '../services/weatherService';

function WeatherPage() {
  const [city, setCity] = useState("Hyderabad");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  const fetchData = async () => {
    try {
      const current = await getCurrentWeather(city);
      const forecast = await getForecastWeather(city);

      setCurrentWeather(current);
      setForecastData(forecast.list);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {currentWeather && <CurrentWeatherCard data={currentWeather} />}

      {forecastData.length > 0 && (
        <WeatherChart forecastData={forecastData} />
      )}

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default WeatherPage;

// import React, { useEffect, useState } from 'react'
// import SearchBar from './SearchBar'
// import ForecastDay from './ForecastDay'
// import CurrentWeatherCard from './CurrentWeatherCard'

// function WeatherPage() {

//   const [city,setCity]=useState("Hyderabad")
//   const [currentWeather,setCurrentWeather]=useState(null)
//   const [forecastData,setForecastData]=useState([])

//   const [error,setError]=useState(null)
//   const [isLoading,setIsLoading]=useState(null)

//   const apiKey='2083f2d80fe38433ed6d66779d8c4cba'

//   const handleSearch=(newCity)=>{
//     setCity(newCity)
//     setCurrentWeather(null)
//     setForecastData([])
//     setError(null)
//   }

//   const fetchData=async()=>{
//     setIsLoading(true)
//     setError(null)
//     try{
//       const currentRes=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
//       const forcastRes=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
//       const currentData=await currentRes.json()
//       const forecastList=await forcastRes.json()
//       console.log(currentData)
//       console.log(forecastList)
//       setCurrentWeather(currentData)
//       setForecastData(forecastList)

//     }catch(err){
//       console.log("Error in fetching API data: ",err)
//       setError("Failed to fetch data.")
//       setCurrentWeather(null)
//       setForecastData([])
//     }finally{
//       setIsLoading(false)
//     }
//   }

//   useEffect(()=>{
//     fetchData()
//   },[city])

//   return (
//     <div>
//         <SearchBar onSearch={handleSearch}/>
//         {
//           currentWeather &&  <CurrentWeatherCard data={currentWeather}/>
//         }
       
//         {
//           forecastData.length!=0 && (
//             <div className='d-flex justify-center'>
//               {
//                 forecastData.list.map((forecastObj,index)=>(
//                   <ForecastDay key={index} data={forecastObj} />
//                 ))
//               }
//             </div>
//           )
//         }

//     </div>
//   )
// }

// export default WeatherPage