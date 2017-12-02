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