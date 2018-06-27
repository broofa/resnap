# resnap

Simple API for capturing and restoring Node's require() cache state.

## Usage

```
const resnap = require('resnap')

const restore = resnap(); // Capture require() cache state

// ... require() some modules, run some code, etc...

restore();  // Restore previous cache state
```

## Example: Resetting Mocha test state

In the Mocha test file below, `foo1`, `foo2`, and `foo3` are all distinct
instances of the 'foo' module due to `beforeEach(resetCache)` clearing the
require() cache state before each test.

```
const resetCache = require('resnap')(); // Capture "clean" cache state

describe(__filename, function() {
  beforeEach(resetCache);

  it('test 1', function(done) {
    const foo1 = require('./foo'); // Loads 'foo' module from disk
    // ...
    done();
  });

  it('test 2', function(done) {
    const foo2 = require('./foo'); // Loads 'foo' from disk (yes, again!)
    // ...
    done();
  });

  it('test 3', function(done) {
    const foo3 = require('./foo'); // Loads 'foo' from disk (yes, again!)
    // ...
    done();
  });
});
```
