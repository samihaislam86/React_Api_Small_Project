import "./App.css";
import { useEffect, useState } from "react";

type WeatherData = {
  name: string;
  dt: number;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  visibility: number;
  wind: {
    speed: number;
  };
};
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE = "https://api.openweathermap.org/data/2.5";
  const country = [
    "London",
    "Dhaka",
    "United States of America",
    "United Kingdom",
    "Tokyo",
    "China",
    "Vietnam"
  ];

function App() {
  

  const [index, setIndex] = useState(0);

  const [time, setTime] = useState(new Date());
  const [apiData, setApiData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const timeinterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    fetch(`${BASE}/weather?q=${country[0]}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      console.log(data);      
      setApiData(data);
    })

    const apifetch = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % country.length;
        fetch(
          `${BASE}/weather?q=${country[nextIndex]}&appid=${API_KEY}&units=metric`,
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data); 
            setApiData(data);
          });
        return nextIndex;
      });
    }, 60000);

    return () => {
      clearInterval(timeinterval);
      clearInterval(apifetch);
    };
  },[]);

  return (
    <>
      <div className="center">
        <h1>Time: </h1>
        <div>{time.toLocaleTimeString()}</div>
      </div>
      <div className="api">
        {apiData ? (
          <>
            <div>Country name: {apiData.name}</div>
            <div>Country temp: {apiData.main.temp}°C</div>
            <div>Country time: {apiData.timezone}</div>

            <div className="text-l text-red-500">Please wait for 1 minute to see another countrys temperature</div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
export default App;
