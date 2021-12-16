import axios from 'axios';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Weather extends Component {

    constructor(props) {
        super(props)
        this.state = {
            forecastData: []
        }
    }

    getWeatherForecast = async () => {
        const url = `${process.env.REACT_APP_API_URL}/weather?city=${this.props.location.display_name.split(',')[0]}&lat=${this.props.location.lat}&lon=${this.props.location.lon}`
        let results = await axios.get(url);
        console.log(results.data);
        this.setState({ forecastData: results.data })
    }



    render() {
        return (
            <>
                <button onClick={this.getWeatherForecast}>get todays forecast</button>
                {this.state.forecastData.length && this.state.forecastData.map((dayForecast, idx) => <li key={idx}>date: {dayForecast.datetime}low temp:{dayForecast.min_temp} high temp:{dayForecast.max_temp} description:{dayForecast.description}</li>)}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>High Temp</th>
                            <th>Low Temp</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}