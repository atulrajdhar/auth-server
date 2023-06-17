'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload, secret, options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (secret) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error('secret should not be empty');

                    case 2:
                        if (!((!payload || Object.keys(payload).length === 0) && (!options || Object.keys(options).length === 0))) {
                            _context.next = 4;
                            break;
                        }

                        throw new Error('either payload or options should be specified');

                    case 4:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            _jsonwebtoken2.default.sign(payload, secret, options, function (err, token) {
                                if (err) {
                                    console.log(err.message);
                                    reject(_httpErrors2.default.InternalServerError());
                                }
                                resolve(token);
                            });
                        }));

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();