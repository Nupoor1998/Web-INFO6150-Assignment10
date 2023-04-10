import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

var moment = require("moment");

function WeatherData(props) {
  let _date = new Date();
  const weekday = props.reading.dt * 1000;
  _date.setTime(weekday);
  const _img = `owf owf-${props.reading.weather[0].id} owf-3x`;
  const fahrenheitMax = props.reading.main.temp_max;

  const fahrenheitMin = props.reading.main.temp_min;

  const farenheitTemp = props.reading.main.temp;

  const farenheitFeelsLike = props.reading.main.feels_like;

  return (
    
      <div className="row">
        <div className="col-12">
          <Link
            to={{
              pathname: `/forecast/${props.reading.day}`,
              state: {
                completeData: props.completeData,
                cityName: props.cityName,
              },
            }}
          >
            <div className="card py-3 mt-3">
              <div className="row">
                <div className="col">
                  <h4 className="text-success">
                    {moment(_date).format("D MMMM, Y")}
                  </h4>
                  <h5>{props.reading.day}</h5>
                  <h5>Temperature: {farenheitTemp}°F</h5>
                  <i className={_img}></i>
                  <p>{props.reading.weather[0].description}</p>
                  
                  <p>
                    Feels Like: {farenheitFeelsLike} °F
                    <br/>
                    Min Temp: {fahrenheitMin}°F 
                    <br></br>
                    Max Temp: {fahrenheitMax}°F
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
  );
}

export default withRouter(WeatherData);
