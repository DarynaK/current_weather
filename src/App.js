import React, { Component } from 'react';

const API_KEY = '117452d6f36dafe584023fd78c9ba5cd';

class App extends Component {

    constructor(props) {
       super(props);
        this.state = {
            icon: undefined,
        }
    }


    getData = async() => {
        let city = 'Lviv';
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(res => {
                let data = res.json();
                return data

            })
            .then(data => {
                this.setState({
                    icon: data.weather[0].icon,
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App">
                <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`}/>
                <button onClick={this.getData}>Click</button>
            </div>
        );
    }
}

export default App;
