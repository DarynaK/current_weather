import React, { Component } from 'react';
import Response from './Response';
import 'antd/dist/antd.css';
import './index.css';
import { Button } from 'antd';
import { Input } from 'antd';
import 'antd/dist/result.css';

import Background from './assets/clearsky.jpg';
import fewClouds from './assets/fewclouds.jpg';
import mist from './assets/mist.jpg';
import brokenClouds from './assets/brokenclouds.jpg';
import rain from './assets/rain.jpg';
import snow from './assets/snow.jpg';
import thunderstorm from './assets/thunderstorm.jpg';
import showerrain from './assets/showerrain.jpg';
import scatteredclouds from './assets/scatteredclouds.jpg';

const API_KEY = '117452d6f36dafe584023fd78c9ba5cd';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: '',
            description: '',
            value: 'lviv',
            name: 'City Name',
            sunrise: '',
            sunset: '',
            temp: '',
            error: '',
            defaultBgrnd: mist,
        }
    }

    getData = async() => {
        let city = this.state.value;
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(res => {
                if (res.ok) {
                    let data = res.json();
                    console.log(data);
                    return data
                } else {
                    return Promise.reject(res.statusText)
                }

            })
            .then(data => {

                const sunsetTime = data.sys.sunset;
                const getDate = new Date(sunsetTime *1000);
                const sunset_time = getDate.getHours() + ':' + getDate.getMinutes() + ':' + getDate.getSeconds();

                const sunriseTime = data.sys.sunrise;
                const getSDate = new Date(sunriseTime *1000);
                const sunrise_time = getSDate.getHours() + ':' + getSDate.getMinutes() + ':' + getSDate.getSeconds();

                this.setState({
                    icon: data.weather[0].icon,
                    description: data.weather[0].description,
                    name: data.name,
                    sunrise: sunrise_time,
                    sunset: sunset_time,
                    temp: data.main.temp,
                    error: '',
                    defaultBgrnd: '',
                })
                this.changeBgrnd()
            })
            .catch((er) => {
                this.setState({
                    icon: '',
                    description: '',
                    value: '',
                    name: '',
                    sunrise: '',
                    sunset: '',
                    temp: '',
                    error: er==="Bad Request"?"Fill in the input":er,
                })
            })
    }


    getValue = e => {
       this.setState({
          value: e.target.value,
       });
    }

    changeBgrnd = () => {

        switch(this.state.icon) {
            case '01d':
            case '01n':
                this.setState({
                    defaultBgrnd: Background ,
                });
                break;
            case '02d':
            case '02n':
                this.setState({
                    defaultBgrnd: fewClouds ,
                });
                break;
            case '03d':
            case '03n':
                this.setState({
                    defaultBgrnd: scatteredclouds,
                    });
                break;
            case '04d':
            case '04n':
                this.setState({
                    defaultBgrnd: brokenClouds,
                });
                break;
            case '09d':
            case '09n':
                this.setState({
                    defaultBgrnd: showerrain,
                });
                break;
            case '10d':
            case '10n':
                this.setState({
                    defaultBgrnd: rain,
                });
                break;
            case '11d':
            case '11n':
                this.setState({
                    defaultBgrnd: thunderstorm,
                });
                break;
            case '13d':
            case '13n':
                this.setState({
                    defaultBgrnd: snow,
                });
                break;
            case '50d':
            case '50n':
                this.setState({
                    defaultBgrnd: mist ,
                })
        }

    };

    render() {
        const getValue = this.getValue;
        return (
            <div className="container">
                <div className="weather_form" style={{backgroundImage:`url(${this.state.defaultBgrnd})`, height: '100vh',}}>
                    <div className="form_container">
                        <label htmlFor="city_name">

                        </label>
                        <Input size="large" className="city_name" name="city_name" onChange={getValue} value={this.state.value}/>
                        <Button type="primary" onClick={this.getData}>Show weather</Button>
                    </div>
                    <Response name={this.state.name}
                              sunrise={this.state.sunrise}
                              sunset={this.state.sunset}
                              temp={this.state.temp}
                              icon={this.state.icon}
                              error={this.state.error}
                    />
                </div>
            </div>
        );
    }
}

export default Form;