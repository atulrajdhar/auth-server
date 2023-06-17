"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input, salt) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(input == null || input.length === 0)) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error("Input should not be empty");

                    case 2:
                        if (!(Buffer.byteLength(input) > 72)) {
                            _context.next = 4;
                            break;
                        }

                        throw new Error("Input should contain less than 72 characters");

                    case 4:
                        if (!(salt == null)) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error("Salt value should not be empty");

                    case 6:
                        if (!(salt <= 0 || salt > 15)) {
                            _context.next = 8;
                            break;
                        }

                        throw new Error("Salt value should be greater than 0 and less than or equal to 15");

                    case 8:
                        _context.next = 10;
                        return _bcrypt2.default.hash(input, salt);

                    case 10:
                        return _context.abrupt("return", _context.sent);

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();