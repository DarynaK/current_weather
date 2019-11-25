import React, { Component } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import './index.css';


class Response extends Component {
    constructor(props) {
        super(props);
    }

    render() {
         const weatherImg = this.props.icon === ''? '':`http://openweathermap.org/img/w/${this.props.icon}.png`;

        return(
                <div className="weather_response" style={{ background: 'rgba(236, 236, 236, 0.6)', padding: '30px' }}>
                    <Card title={this.props.name} bordered={false} style={{ width: 300 }}>
                        <div style={{display:this.props.sunrise?'block':'none'}}>
                            <p>
                                Sunrise: {this.props.sunrise}
                            </p>
                            <p>
                                Sunset: {this.props.sunset}
                            </p>
                            <p>
                                Temperature: {this.props.temp} C
                            </p>
                            <img src={weatherImg}/>
                        </div>
                        <p>
                            {this.props.error}
                        </p>
                    </Card>
                </div>
        );
    }
}

export default Response;