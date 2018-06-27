'use strict';

const assert = require('assert');
const resnap = require('../index.js');

const cleanState = resnap();

describe(__filename, function() {
  beforeEach(cleanState);

  it('unloads modules from cache', function(done) {
    const resetCache = resnap();

    const a = require('./hello');
    const b = require('./hello');
    assert.equal(a, b, 'modules are cached');
    resetCache();

    const c = require('./hello');
    assert.notEqual(a, c, 'modules aren\'t cached');

    done();
  });

  it('restores modules back to cache', function(done) {
    // Load a module and hang some state off it
    const a = require('./hello');
    a.state = 'state1';
    const state1 = resnap();

    // Clear cache, reload module, different state
    cleanState();
    const b = require('./hello');
    assert.notEqual(a, b, 'loads a new instance');

    b.state = 'state2';
    let state2 = resnap();

    // Assert that we can restore the different states
    state1();
    assert.equal(require('./hello').state, 'state1', 'restores state1');

    state2();
    assert.equal(require('./hello').state, 'state2', 'restores state2');

    done();
  });
});
