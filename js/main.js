//splice qilib faqat 1000 taasini olindi


//document dan olib kelingan elementlar
const wrapperTemplate = document.querySelector("#wrapper-template").content;
const movieCard = document.querySelector(".card");
const cardBody = movieCard.querySelector(".card-body");
const wrapperUl = document.querySelector(".wrapper-list");

const elForm = document.querySelector(".form-movie");
const elInput = document.querySelector(".input-movie");

//har birini tartib ga solindi

const normolizedList = movies.map((kino) => {
    return {
        // img: kino.ImageURL,
        title: kino.Title,
        fullTitle: kino.fulltitle,
        movieYear: kino.movie_year,
        Categories: kino.Categories,
        summary: kino.summary,
        Img: kino.ImageURL,
        imgId: kino.imdb_id,
        rating: kino.imdb_rating,
        runtime: kino.runtime,
        language: kino.language,
        ytid: kino.ytid,
    }
})

//template orqali ishlatilgan elementlar 

const createMovie = (movie) => {
    const elMovieLi = wrapperTemplate.cloneNode(true);

    //image si ohshamadi ustoz

    // $(".wrapper-img", elMovieLi).src = "https://hydramovies.com/wp-content/uploads/2018/04/New-York-Doll-Movie-Poster.jpg";
    $(".wrapper-title", elMovieLi).textContent = movie.Title;
    $(".wrapper-titule", elMovieLi).textContent = movie.fulltitle;
    $(".wrapper-year", elMovieLi).textContent = movie.movie_year;
    $(".wrapper-categories", elMovieLi).textContent = movie.Categories;
    $(".wrapper-summary", elMovieLi).textContent = movie.summary;
    $(".wrapper-rating", elMovieLi).textContent = movie.rating;
    $(".wrapper-runtime", elMovieLi).textContent = movie.runtime;
    $(".wrapper-language", elMovieLi).textContent = movie.language;

    return elMovieLi;
}

//template dagi fragmentini ichidagi element olinishi va uni append qilinishi

const renderMovies = (movies) => {
    const resultMovieFragment = document.createDocumentFragment();
    
    movies.forEach((movie) => {
        resultMovieFragment.appendChild(createMovie(movie));
    })
    wrapperUl.appendChild(resultMovieFragment);
}
//va js da mashi function ishga tushurish
renderMovies(normolizedList);




elForm.addEventListener("input", (evt) => {
    evt.preventDefault();
    
    const elInputSearch = new RegExp(elInput.value.trim(), "gi");

    let searchResult = normolizedList.filter((movie) => { 
        if(movie.title.match(elInputSearch)) {
            return movie.title.match(elInputSearch);
        }
        
    })
    renderMovies(searchResult);
})

