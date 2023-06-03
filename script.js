const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieDetails = document.getElementById('movie-details');

searchButton.addEventListener('click', searchMovie);

function searchMovie() {
  const searchTerm = searchInput.value;

  // Replace 'YOUR_API_KEY' with your actual OMDB API key
 const apiURL = `https://www.omdbapi.com/?apikey=5a3bd832&t=${searchTerm}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        const title = data.Title;
        const year = data.Year;
        const plot = data.Plot;
        const poster = data.Poster;

        const html = `
          <h2>${title} (${year})</h2>
          <img src="${poster}" alt="${title} poster">
          <p>${plot}</p>
        `;

        movieDetails.innerHTML = html;
        movieDetails.style.display = 'block';
      } else {
        movieDetails.innerHTML = '<p>No movie found. Please try again.</p>';
        movieDetails.style.display = 'block';
      }
    })
    .catch(error => {
      console.error(error);
      movieDetails.innerHTML = '<p>An error occurred. Please try again later.</p>';
      movieDetails.style.display = 'block';
    });
}
