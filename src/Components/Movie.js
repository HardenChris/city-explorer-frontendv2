import React, { Component } from 'react';
import axios from 'axios';

class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
        }
    }


    componentDidMount() {
        this.getMovies();
    }

    getMovies = async () => {
        // const city_name = locationObject.display_name.split(',')[0];
        // const city_name = `${process.env.REACT_APP_API_URL}/movies?city=${this.props.city}`
        console.log(this.props.location);
        const apiURL = `${process.env.REACT_APP_API_URL}/movies?city_name=${this.props.location.display_name}`;
        let movieResponse = await axios.get(apiURL);
        this.setState({ movies: movieResponse.data });
    }
    render() {
        return (
            <div>
                {this.state.movies.length > 0 && this.state.movies.map((movie, i) =>
                (<div key={i}>
                    <h3>{movie.title}</h3>
                    <img src={movie.image_url} alt={movie.overview} />
                    <p>{movie.overview}</p>
                </div>)
                )}
            </div>
        );
    }
}


export default Movie;