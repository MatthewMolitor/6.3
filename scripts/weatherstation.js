/*************************************************************************
 * File: weatherstation.js
 * This file defines a React component that implements the Weather
 * Station app developed in Chapter 10.
 ************************************************************************/

/*************************************************************************
 * @class WeatherStation 
 * @Desc 
 * This React component uses the OpenWeatherMap API to render the weather
 * conditions at a given latitude and longitude.
 *************************************************************************/
class WeatherStation extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {latitude: this.props.latitude,
                    longitude: this.props.longitude
                   };
    }

    componentDidMount = () => {
        this.getCurrentObservations();
    }

    toggleUnits = () => {
        if (this.state.tempUnit == "F") {
            this.setState({tempUnit: "C", temp: Math.round((this.state.temp - 32) * 5/9)});
        } else {
            this.setState({tempUnit: "F", temp: Math.round((this.state.temp * 9/5) + 32)});
        }
    }

    getCurrentObservations = async() => {
        const response1 = await fetch('https://api.weather.gov/points/'+               
          this.state.latitude + ',' +
          this.state.longitude);
        //get values for lat + long based on prior call
        const response = await fetch('https://api.weather.gov/gridpoints/' +
        'OTX/141,45/forecast');             
 
        const currWeather = await response.json();
        this.setState({place: currWeather.name,
            retrieved: (new Date()).toLocaleDateString() + " at " + 
               (new Date()).toLocaleTimeString(),
            conditions: currWeather.properties.periods[0].shortForecast,
            // no property for visibility
            //visibility: currWeather.properties.periods[0].visibility,
            //visibilityUnit: "Meters",
            temp: Math.round(currWeather.properties.periods[0].temperature),
            tempUnit: "F",
            //humidity: currWeather.main.humidity,
            //visibility: currWeather.visibility,
            wind: currWeather.properties.periods[0].windSpeed,
            //windUnit: "mph",
            windDirection: currWeather.properties.periods[0].windDirection,
            //windDirectionUnit: "Cardinal Directions"
        });
    }

   render() {
        return (
        <section className="jumbotron ws-centered ws-padding">
            <h1>Weather Conditions at {this.state.place}</h1>
                <p><i>Last updated: {this.state.retrieved}</i></p>
                <p>Conditions: {this.state.conditions}</p>
                <p>Visibility: {this.state.visibility + " " + this.state.visibilityUnit}</p>
                <p>Temp: {this.state.temp}&deg;&nbsp;{this.state.tempUnit}</p>
               
                <p>Wind Speed: {this.state.wind }</p>
                <p>Wind Direction: {this.state.windDirection }</p>
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" 
                       id={"switch-" + this.props.stationId} onClick={this.toggleUnits} />
                <label className="custom-control-label" 
                    htmlFor={"switch-" + this.props.stationId}>&nbsp;&deg;{this.state.tempUnit}</label>
            </div>
        </section>
        );
    }

}
