import React from 'react';
// use env.API_Key to secure API Key from being leaked
class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: []
    }
    // bind methods here
    this.showDate = this.showDate.bind(this);
    this.showIcon = this.showIcon.bind(this);
    this.mapWeather = this.mapWeather.bind(this);
  }

  componentDidMount() {
    let current = null;
    let id = 1;
    const tempArray = [];
    let tempObject = {};

    fetch("https://api.openweathermap.org/data/2.5/forecast?zip=90630,us&appid=c670fca5060676c3ab06005ac9d1b950")
      .then(result => result.json())
      .then(data => {
        for (const elem of data.list) {
          // cleaning data returned from API with conditional statement
          if (current !== elem.dt_txt.slice(0,10)) {
            current = elem.dt_txt.slice(0,10);

            tempObject.date = current;
            tempObject.temp_max = parseInt((elem.main.temp_max - 273.15)*(9/5) + 32);
            tempObject.temp_min = parseInt((elem.main.temp_min - 273.15)*(9/5) + 32);
            tempObject.description = elem.weather[0].description;
            // need id to map an array with key
            tempObject.weatherId = id++;

            tempArray.push(tempObject);

            // reset tempObject at the end of each loop
            tempObject = {};
          }
        }
        // API returns data for 6 days and we only need 5, therefore pop()
        tempArray.pop();

        this.setState({ weather: tempArray });
      });
  }

  showDate(date) {
    const newDate = new Date(date);
    const dayNumber = newDate.getDay();

    if (dayNumber === 0) {
      return "Sun";
    } else if (dayNumber === 1) {
      return "Mon";
    } else if (dayNumber === 2) {
      return "Tue";
    } else if (dayNumber === 3) {
      return "Wed";
    } else if (dayNumber === 4) {
      return "Thu";
    } else if (dayNumber === 5) {
      return "Fri";
    } else if (dayNumber === 6) {
      return "Sat";
    }
  }

  showIcon(description) {
    if (description === "clear sky") {
      return "01d";
    } else if (description === "few clouds") {
        return "02d";
    } else if (description === "scattered clouds") {
        return "03d";
    } else if (description === "broken clouds") {
        return "04d";
    } else if (description === "shower rain") {
        return "09d";
    } else if (description === "rain") {
        return "10d";
    } else if (description === "thunderstorm") {
        return "11d";
    } else if (description === "snow") {
        return "13d";
    } else {
        // last choice left is mist
        return "50d";
    }
  }

  mapWeather(weatherArray) {
    const weathers = weatherArray.map(weather =>
      <div key={ weather.weatherId } className="weather-container">
        <p className="date-font">{ this.showDate(weather.date) }</p>
        <img src={ `http://openweathermap.org/img/wn/${ this.showIcon(weather.description) }@2x.png` } alt={ weather.description } />
        <div className="temperature">
          <p className="temp-max-font">{ weather.temp_max }&deg;</p>
          <p className="temp-min-font">{ weather.temp_min }&deg;</p>
        </div>
      </div>
    );

    return weathers;
  }

  render() {
    return (
      <div className="viewport">
        <div className="container">
          { this.mapWeather(this.state.weather) }
        </div>
      </div>
    );
  }
}

export default Weather;
