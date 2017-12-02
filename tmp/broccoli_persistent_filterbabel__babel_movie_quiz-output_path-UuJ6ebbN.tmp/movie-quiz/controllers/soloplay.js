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