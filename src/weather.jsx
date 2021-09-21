import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    // bind methods here
    this.mapJsx = this.mapJsx.bind(this);
  }

  render() {
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
