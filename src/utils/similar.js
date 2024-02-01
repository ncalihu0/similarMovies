
const movieID = (movie, callback) => {

    const urlMovie = 'https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1';
    const options1 = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjY5YzdjYTI1YWY5OGUwNDIwOGNkNjcyMTljMzIxMyIsInN1YiI6IjY1NzdhMGY0OTQ1MWU3MGZlYTZlODI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.waXvvnV7RZ375e17_ZCcBrH13zU1RMFAX0j86oINe18'
        }
    };

    fetch(urlMovie, options1)
        .then(res => res.json())
        .then(json => {
            const movieID = json.results[0].id
            const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/similar?language=en-US&page=1';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjY5YzdjYTI1YWY5OGUwNDIwOGNkNjcyMTljMzIxMyIsInN1YiI6IjY1NzdhMGY0OTQ1MWU3MGZlYTZlODI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.waXvvnV7RZ375e17_ZCcBrH13zU1RMFAX0j86oINe18'
                }
            };

            fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    const similar = [];
                    const images = [];

                    json.results.forEach(element => {
                        similar.push(element.title);
                        images.push("https://image.tmdb.org/t/p/original/" + element.poster_path);
                    });

                    const result = {
                        similar: similar,
                        images: images
                    };

                    callback(undefined, result);
                })
                .catch(err => console.error('error:' + err));
        }
        )
        .catch(err => console.error('error:' + err));

}

module.exports = movieID;

