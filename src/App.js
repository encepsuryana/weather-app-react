/* eslint-disable react-hooks/exhaustive-deps */
/* Import UseEffect & UseState */
import { useEffect, useState } from "react";

/* Styled */
import "./App.css";

/* Background Assets */
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";

/* Icons Assets */
import Search from "./assets/search.svg";

function App() {
  /* State for input and data Location function, default location is Bandung, Indonesia */
  const [location, setLocation] = useState("Bandung");
  const [locInfo, setLocInfo] = useState({});

  /* useEffect when loading call function getData();*/
  useEffect(() => {
    /* Call function getData(); */
    getData();
  }, []);

  /* function getData(); */
  const getData = () => {
    /* Fetch Data from API weatherapi.com*/
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=3db89da3e4de4b06afe141138222801&q=${location}&days=1&aqi=no&alerts=no`
    )
      /* Parsing data to json */
      .then((response) => response.json())
      .then((data) =>
        /* Get data from API weatherapi.com */
        setLocInfo({
          name: data.location.name,
          country: data.location.country,
          localtime: data.location.localtime,
          celcius: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            low: data.forecast.forecastday[0].day.mintemp_c,
          },
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          wind_km: data.current.wind_kph,
          humidity: data.current.humidity,
          visibility: data.current.vis_km,
        })
      );
  };

  /* console.log(locInfo); */
  /* Render data*/
  return (
    /* Begin Background */
    <div
      className="min-h-screen flex items-center justify-center background-cover"
      style={
        /* Set Condition for Background App */
        locInfo.condition?.toLowerCase() === "clear" ||
        locInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Clear})` }
          : locInfo.condition?.includes("cloudy")
          ? { backgroundImage: `url(${Cloudy})` }
          : locInfo.condition?.toLowerCase().includes("rainy")
          ? { backgroundImage: `url(${Rainy})` }
          : locInfo.condition?.toLowerCase().includes("snow")
          ? { backgroundImage: `url(${Snow})` }
          : { backgroundImage: `url(${Overcast})` }
      }
    >
      {/* Begin Box */}
      <div className="flex flex-col bg-white/70 backdrop-blur-md rounded p-4 w-full max-w-xs ">
        {/* Begin Search */}
        <div className="mb-3">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 pr-2">
              <button onClick={getData}>
                <img src={Search} alt={Search} />
              </button>
            </span>
            <input
              className="placeholder:italic capitalize placeholder:text-slate-400 block bg-white/70 backdrop-blur-md w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for a location..."
              type="text"
              name="search"
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={getData}
              value={location}
            />
          </label>
        </div>
        {/* End Search */}
        {/* Begin Content Weather */}
        <div className="font-bold text-xl">
          {locInfo.name}, {locInfo.country}
        </div>
        <div className="text-sm text-gray-500">{locInfo.localtime}</div>
        <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
          <img src={locInfo.icon} alt={locInfo.condition}></img>
        </div>
        <div className="flex flex-row items-center justify-center mt-6">
          <div className="font-medium text-6xl">
            {locInfo.celcius?.current}°
          </div>
          <div className="flex flex-col items-center ml-6">
            <div>{locInfo.condition}</div>
            <div className="mt-1">
              <span className="text-sm">
                <i className="far fa-long-arrow-up"></i>
              </span>
              <span className="text-sm font-light text-gray-500">
                {locInfo.celcius?.high}°C
              </span>
            </div>
            <div>
              <span className="text-sm">
                <i className="far fa-long-arrow-down"></i>
              </span>
              <span className="text-sm font-light text-gray-500">
                {locInfo.celcius?.low}°C
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-6">
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Wind</div>
            <div className="text-sm text-gray-500">{locInfo.wind_km}k/h</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-500">{locInfo.humidity}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Visibility</div>
            <div className="text-sm text-gray-500">{locInfo.visibility}km</div>
          </div>
        </div>
        {/* End Content Weather */}
      </div>
      {/* End Box */}
    </div>
    // End Background
  );
}

export default App;
