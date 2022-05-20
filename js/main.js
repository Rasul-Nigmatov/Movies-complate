//splice qilib faqat 1000 taasini olindi
movies.splice(10)

//document dan olib kelingan elementlar
const wrapperTemplate = document.querySelector("#wrapper-template").content;
const movieCard = document.querySelector(".card");
const cardBody = movieCard.querySelector(".card-body");
const wrapperUl = document.querySelector(".wrapper-list");

const elForm = document.querySelector(".form-movie");
const elSearchInput = document.querySelector(".input-movie");

const elRatingInput = elForm.querySelector(".input-reting");
const elSortForm = document.querySelector("#form-sort");


//har birini tartib ga solish

const normolizedList = movies.map((kino) => {
    return {
        title: kino.Title,
        fullTitle: kino.fulltitle,
        movieYear: kino.movie_year,
        categories: kino.Categories.split("|").join(", "),
        summary: kino.summary,
        imgRating: kino.imdb_rating,
        runtime: kino.runtime,
        language: kino.language,
        trailer: `https://www.youtube.com/watch?v=${kino.ytid}`,
        smallPoster: `http://i3.ytimg.com/vi/${kino.ytid}/hqdefault.jpg`,
        bigPoster: `https://i3.ytimg.com/vi/${kino.ytid}/maxresdefault.jpg`,
    }
})

//template orqali ishlatilgan elementlar 

const createMovie = (movie) => {
    const elMovieLi = wrapperTemplate.cloneNode(true);

    //image si ohshamadi ustoz

    
    $(".wrapper-title", elMovieLi).textContent = movie.title;
    $(".card-img-top", elMovieLi).src = movie.smallPoster;
    $(".card-img-top", elMovieLi).alt = movie.title;
    $(".wrapper-titule", elMovieLi).textContent = movie.fulltitle;
    $(".wrapper-year", elMovieLi).textContent = movie.movie_year;
    $(".wrapper-categories", elMovieLi).textContent = movie.categories;
    $(".wrapper-summary", elMovieLi).textContent = movie.summary;
    $(".wrapper-rating", elMovieLi).textContent = movie.rating;
    $(".wrapper-runtime", elMovieLi).textContent = movie.runtime;
    $(".wrapper-language", elMovieLi).textContent = movie.language;
    $(".btn-danger", elMovieLi).href = movie.trailer;

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






elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
        
    const elInputSearch = new RegExp(elSearchInput.value.trim(), "gi");
    
    const searchResult = normolizedList.filter((movie) => { 
        if(movie.title.toString().match(elInputSearch)) {
            // console.log("bitta si chiqvott");
            return movie.title.match(elInputSearch);
        }
        
    })
    renderMovies(searchResult);

    // const elRatingInput = elRatingInput.value.toString();

    // const elRatingInputResult = normolizedList.filter((movie) => {
    //     if (movie.imgRating < 7) {
    //         return elRatingInput;
    //     }
    // })
        
});

elSortForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const elements = evt.target.elements;

    const sortValue = elements.sort.value
    
    movies.sort(function(a, b) {
        switch (sortValue) {
            case "1":
                if(a.Categories > b.Categories) {
                    return 1;

                } else if(a.Categories < b.Categories) {
                return -1;

                } else {
                    return 0
                }
            case"2": 
                return b.Categories - a.Categories;     
                break;
            default:
                break;
        }
        renderMovies(normolizedList)
    })
})
