import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    const myPromise = axios.get(`http://localhost:5001/api/movies/${id}`);
    myPromise
      .then(response => {
        this.setState({ movie: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5001/api/movies/`)
      .then(res => {
        this.state.updateItems(res.data);
        this.state.history.push('/item-list');
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className='save-wrapper'>
        <MovieCard movie={this.state.movie} />
        <div className='save-button' onClick={this.saveMovie}>
          Save
        </div>
        <button className='delete-button' onClick={this.deleteMovie}>
          Delete
        </button>
      </div>
    );
  }
}
