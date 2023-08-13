import React, { useState, useEffect } from "react";
import Spinner from "../Spinner";

const Weather = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [err, setErrMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=2bbdb64d8ff4a310616bca146588b19a`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeatherData(result);
        })
        .catch((err) => {
          setErrMsg("Tidak dapat mengambil data cuaca!");
        });
    };
    fetchData();

    // Fetch API every hour (3600000 milliseconds)
    const intervalId = setInterval(fetchData, 3600000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [lat, long]);

  return (
    <>
      {weatherData ? (
        <>
          <p className="mb-2 text-2xl font-semibold">{weatherData.name}</p>
          <p className="text-2xl font-semibold">
            {isNaN(Math.ceil(weatherData.main?.temp)) ? (
              <Spinner textColor="#F05050" />
            ) : (
              Math.ceil(weatherData.main?.temp)
            )}{" "}
            &deg;C
          </p>
        </>
      ) : (
        <p className="text-2xl font-semibold">{err}</p>
      )}
    </>
  );
};

export default Weather;
