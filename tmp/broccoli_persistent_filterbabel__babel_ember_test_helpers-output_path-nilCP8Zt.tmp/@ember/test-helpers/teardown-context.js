define('@ember/test-helpers/teardown-context', ['exports', '@ember/test-helpers/ext/rsvp', '@ember/test-helpers/settled'], function (exports, _rsvp, _settled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (context) {
    return new Promise(function (resolve) {
      // ensure "real" async and not "fake" RSVP based async
      next(function () {
        var owner = context.owner;


        (0, _rsvp._teardownPromiseListeners)();
        (0, _settled._teardownAJAXHooks)();

        run(owner, 'destroy');
        Ember.testing = false;

        resolve(context);
      });
    });
  };

  var run = Ember.run;
  var next = Ember.run.next;
  var Promise = Ember.RSVP.Promise;
});