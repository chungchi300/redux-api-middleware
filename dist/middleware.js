"use strict";
var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [0, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var RSAA_1 = require("./RSAA");
var validation_1 = require("./validation");
var errors_1 = require("./errors");
var util_1 = require("./util");
function apiMiddleware(_a) {
  var _this = this;
  var getState = _a.getState;
  return function(next) {
    return function(action) {
      if (!validation_1.isRSAA(action)) {
        return next(action);
      }
      return (function() {
        return __awaiter(_this, void 0, void 0, function() {
          var validationErrors,
            callAPI_1,
            requestType_1,
            callAPI,
            endpoint,
            body,
            headers,
            _a,
            options,
            _b,
            doFetch,
            method,
            credentials,
            bailout,
            types,
            _c,
            requestType,
            successType,
            failureType,
            e_1,
            _d,
            e_2,
            _e,
            e_3,
            _f,
            e_4,
            _g,
            e_5,
            _h,
            _j,
            res,
            e_6,
            _k,
            _l,
            _m;
          return __generator(this, function(_o) {
            switch (_o.label) {
              case 0:
                validationErrors = validation_1.validateRSAA(action);
                if (validationErrors.length) {
                  callAPI_1 = action[RSAA_1.default];
                  if (callAPI_1.types && Array.isArray(callAPI_1.types)) {
                    requestType_1 = callAPI_1.types[0];
                    if (requestType_1 && requestType_1.type) {
                      requestType_1 = requestType_1.type;
                    }
                    next({
                      type: requestType_1,
                      payload: new errors_1.InvalidRSAA(validationErrors),
                      error: true
                    });
                  }
                  return [2];
                }
                callAPI = action[RSAA_1.default];
                (endpoint = callAPI.endpoint),
                  (body = callAPI.body),
                  (headers = callAPI.headers),
                  (_a = callAPI.options),
                  (options = _a === void 0 ? {} : _a),
                  (_b = callAPI.fetch),
                  (doFetch = _b === void 0 ? fetch : _b);
                (method = callAPI.method),
                  (credentials = callAPI.credentials),
                  (bailout = callAPI.bailout),
                  (types = callAPI.types);
                (_c = util_1.normalizeTypeDescriptors(types)),
                  (requestType = _c[0]),
                  (successType = _c[1]),
                  (failureType = _c[2]);
                _o.label = 1;
              case 1:
                _o.trys.push([1, 2, , 4]);
                if (
                  (typeof bailout === "boolean" && bailout) ||
                  (typeof bailout === "function" && bailout(getState()))
                ) {
                  return [2];
                }
                return [3, 4];
              case 2:
                e_1 = _o.sent();
                _d = next;
                return [
                  4,
                  util_1.actionWith(
                    __assign({}, requestType, {
                      payload: new errors_1.RequestError(
                        "[RSAA].bailout function failed"
                      ),
                      error: true
                    }),
                    [action, getState()]
                  )
                ];
              case 3:
                return [2, _d.apply(void 0, [_o.sent()])];
              case 4:
                if (!(typeof endpoint === "function")) return [3, 8];
                _o.label = 5;
              case 5:
                _o.trys.push([5, 6, , 8]);
                endpoint = endpoint(getState());
                return [3, 8];
              case 6:
                e_2 = _o.sent();
                _e = next;
                return [
                  4,
                  util_1.actionWith(
                    __assign({}, requestType, {
                      payload: new errors_1.RequestError(
                        "[RSAA].endpoint function failed"
                      ),
                      error: true
                    }),
                    [action, getState()]
                  )
                ];
              case 7:
                return [2, _e.apply(void 0, [_o.sent()])];
              case 8:
                if (!(typeof body === "function")) return [3, 12];
                _o.label = 9;
              case 9:
                _o.trys.push([9, 10, , 12]);
                body = body(getState());
                return [3, 12];
              case 10:
                e_3 = _o.sent();
                _f = next;
                return [
                  4,
                  util_1.actionWith(
                    __assign({}, requestType, {
                      payload: new errors_1.RequestError(
                        "[RSAA].body function failed"
                      ),
                      error: true
                    }),
                    [action, getState()]
                  )
                ];
              case 11:
                return [2, _f.apply(void 0, [_o.sent()])];
              case 12:
                if (!(typeof headers === "function")) return [3, 16];
                _o.label = 13;
              case 13:
                _o.trys.push([13, 14, , 16]);
                headers = headers(getState());
                return [3, 16];
              case 14:
                e_4 = _o.sent();
                _g = next;
                return [
                  4,
                  util_1.actionWith(
                    __assign({}, requestType, {
                      payload: new errors_1.RequestError(
                        "[RSAA].headers function failed"
                      ),
                      error: true
                    }),
                    [action, getState()]
                  )
                ];
              case 15:
                return [2, _g.apply(void 0, [_o.sent()])];
              case 16:
                if (!(typeof options === "function")) return [3, 20];
                _o.label = 17;
              case 17:
                _o.trys.push([17, 18, , 20]);
                options = options(getState());
                return [3, 20];
              case 18:
                e_5 = _o.sent();
                _h = next;
                return [
                  4,
                  util_1.actionWith(
                    __assign({}, requestType, {
                      payload: new errors_1.RequestError(
                        "[RSAA].options function failed"
                      ),
                      error: true
                    }),
                    [action, getState()]
                  )
                ];
              case 19:
                return [2, _h.apply(void 0, [_o.sent()])];
              case 20:
                if (
                  !(
                    typeof requestType.payload === "function" ||
                    typeof requestType.meta === "function"
                  )
                )
                  return [3, 22];
                _j = next;
                return [
                  4,
                  util_1.actionWith(requestType, [action, getState()])
                ];
              case 21:
                _j.apply(void 0, [_o.sent()]);
                return [3, 23];
              case 22:
                next(requestType);
                _o.label = 23;
              case 23:
                _o.trys.push([23, 25, , 27]);
                return [
                  4,
                  doFetch(
                    endpoint,
                    __assign({}, options, {
                      method: method,
                      body: body || undefined,
                      credentials: credentials,
                      headers: headers || {}
                    })
                  )
                ];
              case 24:
                res = _o.sent();
                return [3, 27];
              case 25:
                e_6 = _o.sent();
                _k = next;
                return [
                  4,
                  util_1.actionWith(
                    __assign({}, requestType, {
                      payload: new errors_1.RequestError(e_6.message),
                      error: true
                    }),
                    [action, getState()]
                  )
                ];
              case 26:
                return [2, _k.apply(void 0, [_o.sent()])];
              case 27:
                if (!res.ok) return [3, 29];
                _l = next;
                return [
                  4,
                  util_1.actionWith(successType, [action, getState(), res])
                ];
              case 28:
                return [2, _l.apply(void 0, [_o.sent()])];
              case 29:
                _m = next;
                return [
                  4,
                  util_1.actionWith(
                    __assign({}, failureType, { error: true }),
                    [action, getState(), res]
                  )
                ];
              case 30:
                return [2, _m.apply(void 0, [_o.sent()])];
            }
          });
        });
      })();
    };
  };
}
exports.apiMiddleware = apiMiddleware;
