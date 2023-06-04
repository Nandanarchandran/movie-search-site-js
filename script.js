const API_KEY = 'b3f280a19b534a6d6edd08ee26e1cedf';

function searchMovies() {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    alert('Please enter a movie title');
    return;
  }

  // Clear previous results
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '';

  // Make API request to fetch movie data
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });

  searchInput.value = '';
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies-container');

  if (movies.length === 0) {
    moviesContainer.innerHTML = 'No movies found.';
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.title;
    movieCard.appendChild(titleElement);

    const releaseDateElement = document.createElement('p');
    releaseDateElement.textContent = 'Release Date: ' + movie.release_date;
    movieCard.appendChild(releaseDateElement);

    const ratingElement = document.createElement('p');
    ratingElement.textContent = 'Rating: ' + movie.vote_average;
    movieCard.appendChild(ratingElement);

    const overviewElement = document.createElement('p');
    overviewElement.classList.add('overview');
    overviewElement.textContent = movie.overview;
    movieCard.appendChild(overviewElement);

    if (movie.poster_path) {
      const posterElement = document.createElement('img');
      posterElement.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
      movieCard.appendChild(posterElement);
    }

    // Fetch actor details
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const actorsElement = document.createElement('p');
        actorsElement.textContent = 'Actors: ' + getActors(data);
        movieCard.appendChild(actorsElement);
      })
      .catch(error => {
        console.log('Error:', error);
      });

    moviesContainer.appendChild(movieCard);
  });
}

function getActors(data) {
  if (data.cast) {
    return data.cast.slice(0, 3).map(actor => actor.name).join(', ');
  }
  return '';
}
