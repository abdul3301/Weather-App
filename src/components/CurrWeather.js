import React, { useEffect, useState } from "react";

let latitude;
let longitude;

const CurrWeather = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [temp, setTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    setLoading(true);
  }

  // getLocation();

  async function showPosition(position) {
    if (position) {
      latitude = await position.coords.latitude;
      longitude = await position.coords.longitude;
      setLat(latitude);
      setLon(longitude);
      console.log(latitude);
      console.log(longitude);
    }
  }
  showPosition();
  useEffect(() => {
    const getCurrweather = async () => {
      if (lat && lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=34546a08e24533a33ed204dfe022ee9f`;
        fetch(url)
          .then((data) => {
            setLoading(false);
            return data.json();
          })
          .then((data) => {
            setTemp(data.main.temp);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    };

    getCurrweather();
  }, [lat, lon, getLocation]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button className="currWeatherBtn" onClick={getLocation}>
            <b>Get Current Location's Weather </b>
          </button>
          {temp ? (
            <p>The weather according to your current location is {temp}</p>
          ) : (
            <p>...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrWeather;
