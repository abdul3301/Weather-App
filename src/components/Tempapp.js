import React, { useEffect, useState } from "react";
import "./css/style.css";
import CurrWeather from "./CurrWeather";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=63b34b88d121fac1a7d581551862b1fd`;
      const response = await fetch(url);
      const resJson = await response.json();
      console.log(resJson);
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            placeholder="Enter the city "
            type="search"
            className="inputFeild"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <br />
        <div className="currWeather">
          <CurrWeather />
        </div>

        {!city ? (
          <>
            <br></br>
            <br></br>

            <p className="errorMsg">No Data Found</p>
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </>
        ) : (
          <>
            <div className="info">
              <h2 className="location">
                <i className="fa-solid fa-street-view"></i>
                {search}
              </h2>
              <h1 className="temp">{city.temp} Deg Cel</h1>
              <h3 className="tempmin_max">
                Min : {city.temp_min} Deg Cel | Max : {city.temp_max} Deg Cel
              </h3>
            </div>
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </>
        )}
      </div>
    </>
  );
};

export default Tempapp;

//34546a08e24533a33ed204dfe022ee9f
