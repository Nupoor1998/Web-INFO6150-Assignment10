import React, { useState } from "react";
import WeatherData from "./WeatherData";
var moment = require("moment");

function WeatherContainer() {
  const [completeData, setCompleteData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [hasError, setHasError] = useState(false);

  let display;
  if (completeData.length > 0 || hasError === false) {
    display = displayData();
  }
  function changeText(event) {
    setCityName(event.target.value);
  }

  function displayData() {
    return dailyData.map((reading, index) => (
      <div className="col-2" key={index}>
        <WeatherData
        reading={reading}
        completeData={completeData}
        cityName={cityName}
      />
      </div>
    ));
  }
  function refreshData() {
    const _url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=767ca9c391439e1addd64f3fcbbf1033`;
    fetch(_url)
      .then((res) => res.json())
      .then((data) => {
        const _data = data.list.filter((reading) =>
          reading.dt_txt.includes("00:00:00")
        );
        data.list = data.list.map(function (name) {
          let _date = new Date();
          const weekday = name.dt * 1000;
          _date.setTime(weekday);
          name.day = moment(_date).format("dddd");
          return name;
        });

        setCompleteData(data.list);
        setHasError(false);
        setDailyData(_data);
      })
      .catch((err) => {
        setCompleteData([]);
        setHasError(true);
        setDailyData([]);
      });
  }
  return (
    <div className="container-fluid">
      <br></br>
      <h2 >{cityName} Weather Forecast</h2>
      <div className="inputCard">
        <input
          id="outlined-name"
          label="Enter City Name"
          value={cityName}
          onChange={changeText}
        />
        <br></br>
        <input
          type="button"
          className="btn btn-primary mt-3"
          value="Enter"
          onClick={refreshData}
        />
      </div>
      <br />

      <div className="row">{display}</div>
    </div>
  );
}

export default WeatherContainer;
