import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    // bind methods here
    // this.mapJsx = this.mapJsx.bind(this);
  }

  render() {
    let current = null;

    fetch("https://api.openweathermap.org/data/2.5/forecast?zip=90630,us&appid=c670fca5060676c3ab06005ac9d1b950")
      .then(result => result.json())
      .then(data => {
        for (const elem of data.list) {
          if (current !== elem.dt_txt.slice(0,10)) {
            current = elem.dt_txt.slice(0,10);
            console.log(current);
            console.log("MAX TEMP:",elem.main.temp_max);
            console.log("MIN TEMP:",elem.main.temp_min);
            console.log("Weather:",elem.weather[0].description);
          }
        }
        console.log(data);
      })

    return (
      <div class="weather-container">
        <p>Today</p>
        <p>Image Here</p>
        <div class="temperature">
          <p>Max</p>
          <p>Min</p>
        </div>
      </div>
    );
  }
}

export default Weather;
