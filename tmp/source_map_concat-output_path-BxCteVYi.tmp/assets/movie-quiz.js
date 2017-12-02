"use strict";



define('movie-quiz/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default.extend({});
});
define('movie-quiz/app', ['exports', 'movie-quiz/resolver', 'ember-load-initializers', 'movie-quiz/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Application = Ember.Application;


  var App = Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('movie-quiz/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('movie-quiz/controllers/soloplay', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Controller = Ember.Controller;
  exports.default = Controller.extend({
    isDisabled: true,
    gameNotStarted: false,
    roundFinished: false,
    timeForNextRound: true,
    gameFinished: true,
    roundPoints: 0,
    multiplier: 0,
    roundNumber: 0,
    gameFinalScore: 0,
    responseMessage: '',
    firstName: '',
    lastName: '',

    isLength1: Ember.computed.gte('firstName.length', 1),
    isLength2: Ember.computed.gte('lastName.length', 1),
    isConditionValid: Ember.computed.and('isLength1', 'isLength2'),
    isDisabled2: Ember.computed.not('isConditionValid'),

    actions: {
      startGame: function startGame() {
        var roundNum = this.roundNumber;
        roundNum++;
        document.getElementById('roundNumber').innerHTML = "Round: " + roundNum;
        this.set('roundNumber', roundNum);
        this.set('isDisabled', false);
        this.set('gameNotStarted', true);
      },

      isBestMovie: function isBestMovie(movie) {
        if (movie.bestMovie == 'true') {
          alert("Correct!");
          var mult = this.multiplier;
          var total = this.roundPoints + 10 * ++mult;
          this.set('roundPoints', total);
          this.set('multiplier', mult);
        } else {
          alert("Wrong!");
          this.set('multiplier', 0);
        }
        this.set('roundFinished', true);
        this.set('timeForNextRound', false);
        this.send('nextRound');
      },
      nextRound: function nextRound() {
        if (this.roundNumber < 10) {
          var model = this.get('model');
          console.log(model);
          this.get('target.router').refresh();
          this.set('isDisabled', true);
          this.set('roundFinished', false);
          this.set('timeForNextRound', true);
          //call for the method that clicks start button to increment round etc
          this.send('startGame');
        } else {
          var score = this.roundPoints;
          //push final <<score>> to database here
          alert("Game finished! Final score: " + score);
          this.set('gameFinalScore', score);
          //hide jumbotrons
          this.set('gameNotStarted', true);
          this.set('isDisabled', true);
          //show form jumbotron
          this.set('gameFinished', false);
        }
      },
      pushScoreToDatabase: function pushScoreToDatabase() {
        var _this = this;

        //Nguyen enter your code here to push var finalScore to database

        //get the form elements
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');
        var finalScore = this.get('gameFinalScore');

        //To-Do
        var newUser = this.store.createRecord('user', {
          firstName: firstName,
          lastName: lastName,
          score: finalScore
        });

        newUser.save().then(function (response) {
          alert('Success');
          //this.set('responseMessage', `Thank you! We saved your firstName and LastName with the following id: ${response.get('id')}`);
          _this.set('isDisabled', true);
          _this.set('gameNotStarted', false);
          _this.set('roundFinished', false);
          _this.set('timeForNextRound', true);
          _this.set('roundPoints', 0);
          _this.set('multiplier', 0);
          _this.set('roundNumber', 0);
          _this.set('gameFinalScore', 0);
          _this.set('firstName', '');
          _this.set('lastName', '');
          _this.set('gameFinished', true);
          //this.set
        });
      }
    }
  });
});
define('movie-quiz/helpers/app-version', ['exports', 'movie-quiz/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('movie-quiz/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('movie-quiz/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('movie-quiz/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'movie-quiz/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('movie-quiz/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('movie-quiz/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('movie-quiz/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('movie-quiz/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
});
define('movie-quiz/initializers/export-application-global', ['exports', 'movie-quiz/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('movie-quiz/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('movie-quiz/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('movie-quiz/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("movie-quiz/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('movie-quiz/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    firstName: _emberData.default.attr('string'),
    lastName: _emberData.default.attr('string'),
    score: _emberData.default.attr('number', { defaultValue: 0 })

  });
});
define('movie-quiz/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('movie-quiz/router', ['exports', 'movie-quiz/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var EmberRouter = Ember.Router;


  var Router = EmberRouter.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('soloplay');
    this.route('howtoplay');
    this.route('ranking');
  });

  exports.default = Router;
});
define('movie-quiz/routes/howtoplay', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({});
});
define('movie-quiz/routes/ranking', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Route = Ember.Route;
  exports.default = Route.extend({
    model: function model() {
      return this.store.findAll('user').then(function (results) {
        return results.sortBy('score').reverse();
      });
    }
  });
});
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
define('movie-quiz/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('movie-quiz/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
define('movie-quiz/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
define("movie-quiz/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0cnxFFMQ", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n  \"],[12,\"navbar\",[]],[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":true}", "meta": { "moduleName": "movie-quiz/templates/application.hbs" } });
});
define("movie-quiz/templates/howtoplay", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PGpeVUFs", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "movie-quiz/templates/howtoplay.hbs" } });
});
define("movie-quiz/templates/navbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gxmXhVeD", "block": "{\"symbols\":[],\"statements\":[[6,\"nav\"],[9,\"class\",\"navbar navbar-inverse\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"navbar-header\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"button\"],[9,\"class\",\"navbar-toggle collapsed\"],[9,\"data-toggle\",\"collapse\"],[9,\"data-target\",\"#main-navbar\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[0,\"Toggle navigation\"],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"Sign Up Demo\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"collapse navbar-collapse\"],[9,\"id\",\"main-navbar\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav\"],[7],[0,\"\\n            \"],[4,\"link-to\",[\"index\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Home\"],[8]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"howtoplay\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"How To Play\"],[8]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"soloplay\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Solo Play\"],[8]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"link-to\",[\"ranking\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Ranking\"],[8]],\"parameters\":[]},null],[0,\"\\n\\n\\n      \"],[8],[0,\"\\n    \"],[8],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[8],[2,\" /.container-fluid \"],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "movie-quiz/templates/navbar.hbs" } });
});
define("movie-quiz/templates/ranking", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2EkMrpNi", "block": "{\"symbols\":[\"user\"],\"statements\":[[6,\"h1\"],[7],[0,\"Ranking\"],[8],[0,\"\\n\\n\"],[6,\"table\"],[9,\"class\",\"table table-bordered table-striped\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"First Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Last Name\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"Score\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[1,[19,1,[\"firstName\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"lastName\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"score\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "movie-quiz/templates/ranking.hbs" } });
});
define("movie-quiz/templates/soloplay", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "t69ErMxG", "block": "{\"symbols\":[\"movie\"],\"statements\":[[6,\"h1\"],[7],[0,\"Solo Play\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[10,\"hidden\",[18,\"gameNotStarted\"],null],[7],[0,\"\\n  \"],[6,\"p\"],[7],[0,\"Start a game!\"],[8],[0,\"\\n  \"],[6,\"button\"],[9,\"class\",\"btn btn-primary btn-lg btn-block\"],[3,\"action\",[[19,0,[]],\"startGame\"]],[7],[0,\"Start\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[9,\"style\",\"min-width:750px;\"],[10,\"hidden\",[18,\"isDisabled\"],null],[7],[0,\"\\n  \"],[6,\"p\"],[9,\"id\",\"roundNumber\"],[7],[8],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"id\",[26,[[19,1,[\"id\"]]]]],[10,\"data-best-movie\",[26,[[19,1,[\"bestMovie\"]]]]],[3,\"action\",[[19,0,[]],\"isBestMovie\",[19,1,[]]]],[7],[0,\"\\n  \"],[6,\"img\"],[10,\"src\",[26,[[19,1,[\"poster\"]]]]],[9,\"class\",\"img-rounded float-left\"],[9,\"style\",\"max-width:250px; max-height:350px;\"],[10,\"alt\",[26,[[19,1,[\"title\"]]]]],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[2,\"\\n<div hidden={{timeForNextRound}}>\\n  <br><button class=\\\"btn btn-primary btn-lg\\\" {{action 'nextRound'}}>Next Round</button>\\n</div>\\n\"],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[6,\"p\"],[7],[0,\"Round Points: \"],[1,[18,\"roundPoints\"],false],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[10,\"hidden\",[18,\"gameFinished\"],null],[7],[0,\"\\n  \"],[6,\"b\"],[7],[6,\"p\"],[7],[0,\"Final Score: \"],[1,[18,\"gameFinalScore\"],false],[8],[8],[0,\"\\n  \"],[2,\"form handler for pushing name to database here\"],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[7],[0,\"\\n    \"],[6,\"h1\"],[7],[0,\"Account Info\"],[8],[0,\"\\n\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n    \"],[6,\"p\"],[7],[0,\"Please enter your Name\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"form-horizontal form-group form-group-lg row\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"col-md-4 col-md-offset-4\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"for\",\"firstName\"],[7],[0,\"First Name\"],[8],[0,\" \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"text\",[20,[\"firstName\"]],\"form-control\",\"First Name\",\"autofocus\"]]],false],[0,\"\\n        \"],[6,\"label\"],[9,\"for\",\"lastName\"],[7],[0,\"Last Name\"],[8],[0,\" \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"text\",[20,[\"lastName\"]],\"form-control\",\"Last Name\",\"autofocus\"]]],false],[0,\"\\n        \"],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"btn btn-primary btn-lg btn-block\"],[10,\"disabled\",[18,\"isDisabled2\"],null],[3,\"action\",[[19,0,[]],\"pushScoreToDatabase\"]],[7],[0,\"Submit\"],[8],[0,\"\\n\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"responseMessage\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"class\",\"alert alert-success\"],[7],[1,[18,\"responseMessage\"],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[6,\"center\"],[7],[0,\"***Note: If movie does not display a poster, hover over for Movie's title***\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "movie-quiz/templates/soloplay.hbs" } });
});
define('movie-quiz/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});


define('movie-quiz/config/environment', [], function() {
  var prefix = 'movie-quiz';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("movie-quiz/app")["default"].create({"name":"movie-quiz","version":"0.0.0+c394e592"});
}
//# sourceMappingURL=movie-quiz.map
