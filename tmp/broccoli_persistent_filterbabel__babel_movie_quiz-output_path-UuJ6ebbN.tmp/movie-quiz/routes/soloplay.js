define("movie-quiz/routes/soloplay", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var jQuery = Ember.$;

  function getMovieInfo(movieTitle) {
    var requestURL = "http://www.omdbapi.com/?apikey=d0537451&t=" + movieTitle;
    var request = new XMLHttpRequest();
    request.open("GET", requestURL, false);
    request.send(null);
    if (request.status === 200) {
      return request.responseText;
    }
  }

  /*function setMovieImgContainerAttributes(Title,Poster,imdbRating,imdbVotes){
    var newMovieObject={title:Title,poster:Poster,rating:imdbRating,votes:imdbVotes,bestMovie:"false"};
    movieRoundList.push(newMovieObject);
  
  }*/

  function compareScores(movieRoundList) {

    var rating1 = movieRoundList[0].rating;
    var rating2 = movieRoundList[1].rating;
    var rating3 = movieRoundList[2].rating;
    var votes1 = movieRoundList[0].votes;
    var votes2 = movieRoundList[1].votes;
    var votes3 = movieRoundList[2].votes;

    var largestIndex = 0;

    if (rating1 == rating2 && votes1 < votes2 || rating1 < rating2) {
      largestIndex = 1;
    }
    if (rating1 == rating3 && votes1 < votes3 || rating1 < rating3) {
      largestIndex = 2;
    }

    return largestIndex;
  }

  function getThreeMovieTitles(masterMovieList) {
    var movieArray = [];
    for (var i = 0; i < 3; i++) {
      var randomMovieIndex = Math.floor(Math.random() * masterMovieList.length);
      var randomMovie = masterMovieList[randomMovieIndex - 1];
      movieArray[i] = randomMovie;
    }
    return movieArray;
  }

  //test
  function getModelData() {
    var movieRoundList = [];
    var masterMovieList = {};
    jQuery.ajax({
      url: 'movie_list.json',
      success: function success(result) {
        masterMovieList = result;
      },
      async: false
    });
    var threeMovieTitles = getThreeMovieTitles(masterMovieList);
    //var movieTitle3 = 'Nightmare+Before+Christmas';
    //var movieTitle2 = 'Corpse+Bride';
    //var movieTitle1 = 'Frankenweenie';
    var responseText1 = getMovieInfo(threeMovieTitles[0].Title);
    var responseText2 = getMovieInfo(threeMovieTitles[1].Title);
    var responseText3 = getMovieInfo(threeMovieTitles[2].Title);

    var movieObject1 = JSON.parse(responseText1);
    var movieObject2 = JSON.parse(responseText2);
    var movieObject3 = JSON.parse(responseText3);

    var reformatedMovieObject1 = { title: movieObject1.Title,
      poster: movieObject1.Poster,
      rating: movieObject1.imdbRating,
      votes: movieObject1.imdbVotes,
      bestMovie: "false" };
    var reformatedMovieObject2 = { title: movieObject2.Title,
      poster: movieObject2.Poster,
      rating: movieObject2.imdbRating,
      votes: movieObject2.imdbVotes,
      bestMovie: "false" };
    var reformatedMovieObject3 = { title: movieObject3.Title,
      poster: movieObject3.Poster,
      rating: movieObject3.imdbRating,
      votes: movieObject3.imdbVotes,
      bestMovie: "false" };

    /*setMovieImgContainerAttributes(movieObject1.Title,
                                    movieObject1.Poster,
                                    movieObject1.imdbRating,
                                    movieObject1.imdbVotes);
    setMovieImgContainerAttributes(movieObject2.Title,
                                    movieObject2.Poster,
                                    movieObject2.imdbRating,
                                    movieObject2.imdbVotes);
    setMovieImgContainerAttributes(movieObject3.Title,
                                    movieObject3.Poster,
                                    movieObject3.imdbRating,
                                    movieObject3.imdbVotes);
    */
    movieRoundList.push(reformatedMovieObject1);
    movieRoundList.push(reformatedMovieObject2);
    movieRoundList.push(reformatedMovieObject3);

    var bestMovieIndex = compareScores(movieRoundList);
    movieRoundList[bestMovieIndex].bestMovie = "true";
    return movieRoundList;
  }

  exports.default = Ember.Route.extend({
    model: function model() {
      var movieList = getModelData();
      return movieList;
    },

    actions: {
      refresh: function refresh() {
        this.refresh();
      }
    }
  });
});