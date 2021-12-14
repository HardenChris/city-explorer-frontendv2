import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import CityForm from './Components/CityForm.js';
import SearchCard from './Components/SearchCard.js';
import Weather from './Components/Weather.js';
import { Alert } from 'react-bootstrap';
import Header from './Components/Header.js';
import Main from './Components/Main.js';
import Footer from './Components/Footer.js';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: false,
      location: {}
    }
  }




  getLocation = async (city) => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${city}&format=json`;
    // key: YOUR_ACCESS_TOKEN
    // q: SEARCH_STRING
    // format: 'json'
    try {
      let response = await axios.get(url)

      console.log(response.data[0]);
      this.setState({ location: response.data[0] }, this.getMapUrl)
    } catch (e) {
      console.error(e);
      this.setState({ error: true })
    }

  }


  getMapUrl = () => {
    let url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`
    this.setState({
      location: { ...this.state.location, map: url }
    })
  }

  render() {
    return (
      <>
        <CityForm getLocation={this.getLocation} />
        {/* <input onChange={this.handleChange} value={this.state.cityValue}/> */}
        {/* <p>{this.state.cityName}</p>
                <button onClick={this.handleClick}>SEARCH</button> */}
        {this.state.location.map && <SearchCard location={this.state.location} />}

        {this.state.location.map && <Weather location={this.state.location} />}
        {this.state.error && <Alert variant='danger'>Something is broken.</Alert>}
        <Header/>
        <Main/>
        <Footer/>
      </>
    )
  }
}

