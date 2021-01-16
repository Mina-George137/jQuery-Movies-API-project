$(document).ready(function() {
    $(".loading").fadeOut(1500);
    $("body").css("overflow", "auto");


    //  sideBar
    let sideBarToggle = $("#sideBarToggle");
    let sideBar = $("#sideBar");
    let navingContainerWidth = $("#navingContainer").innerWidth();
    let navingContainerHeight = $("#navingContainer").height();
    let navItem = $("#navItem");

    sideBar.css("left", `-${navingContainerWidth}px`);
    navItem.css("top", `${navingContainerHeight}px`);

    sideBarToggle.click(function() {
        if (sideBar.css("left") != "0px") { // still outside
            sideBar.animate({ left: "0px" }, 1000);
            sideBarToggle.addClass("fas fa-times");
            sideBarToggle.removeClass("fa fa-align-justify");
            navItem.animate({ top: "0px" }, 4000);

        } else {
            let navingContainerWidth1 = $("#navingContainer").innerWidth();
            sideBar.animate({ left: `-${navingContainerWidth1}` }, 1000);
            sideBarToggle.addClass("fa fa-align-justify");
            sideBarToggle.removeClass("fas fa-times");
            navItem.animate({ top: `${navingContainerHeight}px` }, 1000);

        }
    });

    // Getting Movies

    let moviesArray = [];

    $("#nowPlaying").click(getMovie);
    async function getMovie() {
        let request = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o`);
        let apiResponse = await request.json();
        let results = apiResponse.results;
        moviesArray = results;
        console.log(moviesArray);
        displayMovies();
    }
    getMovie();

    $("#popular").click(getPopularMovies);

    async function getPopularMovies() {
        let request = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o`);
        let apiResponse = await request.json();
        let results = apiResponse.results;
        moviesArray = results;
        console.log(moviesArray);
        displayMovies();
    }

    $("#topRated").click(getTopRatedMovies);

    async function getTopRatedMovies() {
        let request = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o`);
        let apiResponse = await request.json();
        let results = apiResponse.results;
        moviesArray = results;
        console.log(moviesArray);
        displayMovies();
    }

    $("#trending").click(getTrendingMovies);

    async function getTrendingMovies() {
        let request = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o`);
        let apiResponse = await request.json();
        let results = apiResponse.results;
        moviesArray = results;
        console.log(moviesArray);
        displayMovies();
    }


    $("#upcoming").click(getUpComingMovies);

    async function getUpComingMovies() {
        let request = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o`);
        let apiResponse = await request.json();
        let results = apiResponse.results;
        moviesArray = results;
        console.log(moviesArray);
        displayMovies();
    }

    // searching

    // let searchingValue = $("#movieByWord");
    document.getElementById("movieByWord").addEventListener("keydown", function() {
        let searchingValue = this.value;
        search(searchingValue);
    });

    async function search(searchingValue) {
        let request = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o&language=en-US&query=${searchingValue}`);
        let apiResponse = await request.json();
        let results = apiResponse.results;
        moviesArray = results;
        console.log(moviesArray);
        displayMovies();
        console.log("searchValue");
    }

    //Search Movie Genre
    document.getElementById("searchGenre").addEventListener("keydown", function() {
        let searchingGenre = this.value;
        SearchOfGenre(searchingGenre);
    });

    let genreArray = [];
    async function SearchOfGenre(searchingGenre) {
        let request = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o&language=en-US`);
        let apiResponse = await request.json();
        genreArray = apiResponse.genres;
        // console.log(moviesArray);
        // let inputSearch = searchingGenre.toLowerCase();
        for (let i = 0; i < genreArray.length; i++) {
            if (searchingGenre.toLowerCase() == genreArray[i].name.toLowerCase()) {
                let ID = genreArray[i].id;
                console.log(ID);
                getMovieById(ID);
            }
        }
    }

    let newMovies = [];
    async function getMovieById(genreId) {
        let movieIDArray = [];
        let movieTilteArray = [];

        for (let i = 0; i < moviesArray.length; i++) {

            if (moviesArray[i].genre_ids.includes(genreId)) {
                movieIDArray.push(moviesArray[i].id);
                movieTilteArray.push(moviesArray[i].original_title);
                let request = await fetch(`https://api.themoviedb.org/3/movie/${moviesArray[i].id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2Nw3VU-iBK-gjK-elVH2sFFWKWJWAn9_TuorNVMq6XPFY5QkkyUvKfn-o`);
                let apiResponse = await request.json();
                newMovies.push(apiResponse);

            }

        }
        console.log(movieIDArray);
        // console.log(movieTilteArray);
        console.log(newMovies);

        // console.log(newMovies);
        displaySearchMovie();

    }

    function displaySearchMovie() {
        let box = '';

        for (let i = 0; i < newMovies.length; i++) {

            box += ` 
            <div  id="movie" class="col-md-4 mb-3 pr-0">
            <img src="https://image.tmdb.org/t/p/w500/${newMovies[i].poster_path}" alt=""class="w-100">

                <div class="layer p-5 overflow-hidden">
                    <div class="text-center">
                        <h2>${newMovies[i].original_title}</h2>
                        <p>${newMovies[i].overview}</p>
                        <p>${newMovies[i].vote_average}</p>
                        <p>${newMovies[i].release_date}</p>
                    </div>
                </div>


            </div>
            </div>`
        }

        document.getElementById("showMovies").innerHTML = box;
        clearNewMovies(newMovies);
    }

    function clearNewMovies(array) {
        while (array.length) {
            array.pop();
        }
    }


    function displayMovies() {
        let box = '';

        for (let i = 0; i < moviesArray.length; i++) {

            box += ` 
            <div  id="movie" class="col-md-4 mb-3 pr-0">
            <img src="https://image.tmdb.org/t/p/w500/${moviesArray[i].poster_path}" alt=""class="w-100">

                <div class="layer p-5 overflow-hidden">
                    <div class="text-center">
                        <h2>${moviesArray[i].original_title}</h2>
                        <p>${moviesArray[i].overview}</p>
                        <p>${moviesArray[i].vote_average}</p>
                        <p>${moviesArray[i].release_date}</p>
                    </div>
                </div>


            </div>
            </div>`
        }

        document.getElementById("showMovies").innerHTML = box;
    }



    // validation of inputs

    let registName = $("#registName");
    let registEmail = $("#registEmail");
    let registPassword = $("#registPassword");
    let rePassword = $("#rePassword");

    registName.blur(validUserName);
    registEmail.blur(validUserEmail);
    registPassword.blur(validUserPassword);
    rePassword.blur(validRePassword);

    function validUserName() {
        let regexUserName = /^[A-Z][a-z]{2,}$/;

        if (regexUserName.test(registName.val()) == true) {
            registName.addClass("is-valid");
            registName.removeClass("is-invalid");
            registName.next().css("display", "none");

        } else {
            registName.addClass("is-invalid");
            registName.removeClass("is-valid");
            registName.next().text("Name must begin by A-Z and at least 3 letters");
            registName.next().css("display", "inline");

        }

    }

    function validUserPassword() {
        var regexUserPassword = /^([A-Z]|[a-z]|[1-9]){1,}/;

        if ((regexUserPassword.test(registPassword.val()) == true) && (registPassword.val().length >= 8)) {
            registPassword.addClass("is-valid");
            registPassword.removeClass("is-invalid");
            registPassword.next().css("display", "none");


        } else {
            registPassword.addClass("is-invalid");
            registPassword.removeClass("is-valid");
            registPassword.next().text("Password must contain upper case , lower case and 8 characters minimum");
            registPassword.next().css("display", "inline");
        }
    }

    function validUserEmail() {
        var regexUserEmail = /^([A-Z]|[a-z]|[1-9]){1,}@[a-z]{1,}\./;
        var emailIsValid;
        if (regexUserEmail.test(registEmail.val()) == true) {
            registEmail.addClass("is-valid");
            registEmail.removeClass("is-invalid");
            registEmail.next().css("display", "none");
            emailIsValid = true;

        } else {
            registEmail.addClass("is-invalid");
            registEmail.removeClass("is-valid");
            registEmail.next().text("invalid Email");
            reregistEmail.next().css("display", "inline");
            emailIsValid = false;

        }

    }

    function validRePassword() {
        if (rePassword.val() == registPassword.val()) {
            rePassword.addClass("is-valid");
            rePassword.removeClass("is-invalid");
            rePassword.next().css("display", "none");
        } else {
            rePassword.addClass("is-invalid");
            rePassword.removeClass("is-valid");
            rePassword.next().text("not a matching re-password");
            rePassword.next().css("display", "inline");
        }
    }

    let submitBtn = $("#submitButton");
    submitBtn.click(clearForm);

    function clearForm() {
        registPassword.val('');
        registPassword.removeClass("is-valid");

        registEmail.val('');
        registEmail.removeClass("is-valid");

        registName.val('');
        registName.removeClass("is-valid");

        rePassword.val('');
        rePassword.removeClass("is-valid");
    }

})