'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (num_keys, size) {
    if (num_keys < 1) {
        throw new Error('number of keys to generate should at least be 1');
    }

    if (!size) {
        throw new Error('number of bytes to generate should be specified');
    }

    var keys = [];
    var key = void 0;
    for (var index = 0; index < num_keys; index++) {
        key = _crypto2.default.randomBytes(size).toString('hex');
        keys.push(key);
    }
    console.table(keys);
};