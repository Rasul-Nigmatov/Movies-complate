//splice qilib faqat 1000 taasini olindi
movies.splice(100)

//document dan olib kelingan elementlar
const wrapperTemplate = document.querySelector("#wrapper-template").content;
const movieCard = document.querySelector(".card");
const cardBody = movieCard.querySelector(".card-body");
const wrapperUl = document.querySelector(".wrapper-list");

const elForm = document.querySelector(".form-movie");
const elSearchInput = document.querySelector(".input-movie");
const selectCategories = elForm.querySelector("#categories");
const sortSelect = elForm.querySelector("#modes")


//har birini tartib ga solish

const normolizedList = movies.map((kino) => {
    return {
        title: kino.Title.toString(),
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

//form olib kevolib qidiruvga bergandan song value dagini topib beradi

elSearchInput.addEventListener("input", (evt) => {
    evt.preventDefault();
        
    const elInputSearch = new RegExp(elSearchInput.value.trim(), "gi");
    
    const searchResult = normolizedList.filter((movies) => { 
        if(movies.title.match(elInputSearch)) {
            return movies.title.match(elInputSearch);
        }  
    })
    console.log(searchResult);
    
    renderMovies(searchResult); 
});

// har bitt categories topib kelish function

const movieCategories = [];
const categoriesEveryone = () => {

normolizedList.splice(50).forEach((movie) => {
    movie.categories.split(", ").forEach(function(category) {
        if(!movieCategories.includes(category)) {
            movieCategories.push(category);
        }
    })
    movieCategories.unshift("All");
    return movieCategories;
})
}

categoriesEveryone();

//cotegory da option yaratish template orqali

movieCategories.forEach((categories) => {
    const optionNew = document.createElement("option");
    optionNew.textContent = categories;
    optionNew.value = categories;
    optionNew.name = categories;

    selectCategories.append(optionNew);

}) 

//forEach orqali function bilan ishlab qidirish

const categoriesSearch = function() {
    const i = [];

    normolizedList.forEach((movie) => {
        const arrayCategories = movie.categories.split(", ");
        if (arrayCategories.includes(selectCategories.value)) {
            i.push(movie)
        }
    })

    return i;
}


//function A-Z gacha bo`lgan tartib va uning option elementlar orqali chiqarish

const procedureValue = ["A-Z", "Z-A", "Reyting =>", "Reyting <=" ];

for(let j = 0; j <= procedureValue.length; j++) {
    const sortElOption = document.createElement("option");
    sortElOption.textContent = procedureValue[j];
    sortElOption.value = procedureValue[j];

}


selectCategories.addEventListener("change", (evt) => {
    evt.preventDefault();

    renderMovies(categoriesSearch());
    if (selectCategories.value == "All") {
        renderMovies(normolizedList);
    }
})

sortSelect.addEventListener("change", (evt) => {
    evt.preventDefault();

    const arrSort = [];
    const sortTitleReyting = [];

    if(sortSelect.value == "A-Z") {
        normolizedList.forEach((kino) => {
            arrSort.push(kino.title);
        })
        arrSort.sort();

        arrSort.forEach((title) => {
            normolizedList.forEach((a) => {
                if(a.title == title) {
                    sortTitleReyting.push(a)
                }
            })
        })
    }else if(sortSelect.value == "Z-A") {
        normolizedList.forEach((kino) => {
            arrSort.push(kino.title);
        })
    }   arrSort.sort().reverse();
    
    arrSort.forEach((title) => {
        normolizedList.forEach((a) => {
            if(a.title == title) {
                sortTitleReyting.push(a);
            }else if (sortSelect.value == "Reyting =>") {
                normolizedList.forEach((kino) => {
                    arrSort.push(kino.imgRating);
                })
            }
        })
        arrSort.sort(function(a, b) {
            return a - b
        })
    })
    arrSort.forEach((reyting) => {
        normolizedList.forEach((film) => {
            if (film.imgRating == reyting && !sortTitleReyting.includes(film)) {
                sortTitleReyting.push(film)
            }
        })
    }) 
    renderMovies(sortTitleReyting)
    console.log(sortTitleReyting);
})  


