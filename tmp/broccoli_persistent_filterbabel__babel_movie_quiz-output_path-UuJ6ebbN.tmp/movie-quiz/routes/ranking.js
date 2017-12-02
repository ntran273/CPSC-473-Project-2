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