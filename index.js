/**
 * Snapshot and restore Node's module cache state.  E.g.
 *
 *  const resnap = require('./resnap');
 *
 *  // Capture require cache state
 *  const restore = resnap();
 *
 *  // ... require() some stuff ...
 *
 *  // Restore previous cache state
 *  restore();
 */
module.exports = function resnap_capture() {
  const cacheKeys = Object.assign({}, require.cache);

  return function resnap_restore() {
    for (let k in require.cache) delete require.cache[k];
    Object.assign(require.cache, cacheKeys);
  };
};
