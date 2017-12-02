define('movie-quiz/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/soloplay.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/soloplay.js should pass ESLint\n\n17:14 - Use import { gte } from \'@ember/object/computed\'; instead of using Ember.computed.gte (ember/new-module-imports)\n17:14 - \'Ember\' is not defined. (no-undef)\n18:14 - Use import { gte } from \'@ember/object/computed\'; instead of using Ember.computed.gte (ember/new-module-imports)\n18:14 - \'Ember\' is not defined. (no-undef)\n19:21 - Use import { and } from \'@ember/object/computed\'; instead of using Ember.computed.and (ember/new-module-imports)\n19:21 - \'Ember\' is not defined. (no-undef)\n20:16 - Use import { not } from \'@ember/object/computed\'; instead of using Ember.computed.not (ember/new-module-imports)\n20:16 - \'Ember\' is not defined. (no-undef)\n49:9 - Unexpected console statement. (no-console)\n83:28 - \'response\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/howtoplay.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/howtoplay.js should pass ESLint\n\n');
  });

  QUnit.test('routes/ranking.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/ranking.js should pass ESLint\n\n');
  });

  QUnit.test('routes/soloplay.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/soloplay.js should pass ESLint\n\n2:14 - Use import $ from \'jquery\'; instead of using Ember.$ (ember/new-module-imports)\n112:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)');
  });
});