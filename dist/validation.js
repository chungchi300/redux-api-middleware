"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RSAA_1 = require("./RSAA");
var lodash_1 = require("lodash");
function isRSAA(action) {
  return (
    lodash_1.default.isPlainObject(action) &&
    action.hasOwnProperty(RSAA_1.default)
  );
}
exports.isRSAA = isRSAA;
function isValidTypeDescriptor(obj) {
  var validKeys = ["type", "payload", "meta"];
  if (!lodash_1.default.isPlainObject(obj)) {
    return false;
  }
  for (var key in obj) {
    if (!~validKeys.indexOf(key)) {
      return false;
    }
  }
  if (!("type" in obj)) {
    return false;
  } else if (typeof obj.type !== "string" && typeof obj.type !== "symbol") {
    return false;
  }
  return true;
}
exports.isValidTypeDescriptor = isValidTypeDescriptor;
function validateRSAA(action) {
  var validationErrors = [];
  var validCallAPIKeys = [
    "endpoint",
    "options",
    "method",
    "body",
    "headers",
    "credentials",
    "bailout",
    "types",
    "fetch"
  ];
  var validMethods = [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ];
  var validCredentials = ["omit", "same-origin", "include"];
  if (!isRSAA(action)) {
    validationErrors.push(
      "RSAAs must be plain JavaScript objects with an [RSAA] property"
    );
    return validationErrors;
  }
  for (var key in action) {
    if (key !== RSAA_1.default) {
      validationErrors.push("Invalid root key: " + key);
    }
  }
  var callAPI = action[RSAA_1.default];
  if (!lodash_1.default.isPlainObject(callAPI)) {
    validationErrors.push("[RSAA] property must be a plain JavaScript object");
  }
  for (var key in callAPI) {
    if (!~validCallAPIKeys.indexOf(key)) {
      validationErrors.push("Invalid [RSAA] key: " + key);
    }
  }
  var endpoint = callAPI.endpoint,
    method = callAPI.method,
    headers = callAPI.headers,
    options = callAPI.options,
    credentials = callAPI.credentials,
    types = callAPI.types,
    bailout = callAPI.bailout,
    fetch = callAPI.fetch;
  if (typeof endpoint === "undefined") {
    validationErrors.push("[RSAA] must have an endpoint property");
  } else if (typeof endpoint !== "string" && typeof endpoint !== "function") {
    validationErrors.push(
      "[RSAA].endpoint property must be a string or a function"
    );
  }
  if (typeof method === "undefined") {
    validationErrors.push("[RSAA] must have a method property");
  } else if (typeof method !== "string") {
    validationErrors.push("[RSAA].method property must be a string");
  } else if (!~validMethods.indexOf(method.toUpperCase())) {
    validationErrors.push("Invalid [RSAA].method: " + method.toUpperCase());
  }
  if (
    typeof headers !== "undefined" &&
    !lodash_1.default.isPlainObject(headers) &&
    typeof headers !== "function"
  ) {
    validationErrors.push(
      "[RSAA].headers property must be undefined, a plain JavaScript object, or a function"
    );
  }
  if (
    typeof options !== "undefined" &&
    !lodash_1.default.isPlainObject(options) &&
    typeof options !== "function"
  ) {
    validationErrors.push(
      "[RSAA].options property must be undefined, a plain JavaScript object, or a function"
    );
  }
  if (typeof credentials !== "undefined") {
    if (typeof credentials !== "string") {
      validationErrors.push(
        "[RSAA].credentials property must be undefined, or a string"
      );
    } else if (!~validCredentials.indexOf(credentials)) {
      validationErrors.push("Invalid [RSAA].credentials: " + credentials);
    }
  }
  if (
    typeof bailout !== "undefined" &&
    typeof bailout !== "boolean" &&
    typeof bailout !== "function"
  ) {
    validationErrors.push(
      "[RSAA].bailout property must be undefined, a boolean, or a function"
    );
  }
  if (typeof types === "undefined") {
    validationErrors.push("[RSAA] must have a types property");
  } else if (!Array.isArray(types) || types.length !== 3) {
    validationErrors.push("[RSAA].types property must be an array of length 3");
  } else {
    var requestType = types[0],
      successType = types[1],
      failureType = types[2];
    if (
      typeof requestType !== "string" &&
      typeof requestType !== "symbol" &&
      !isValidTypeDescriptor(requestType)
    ) {
      validationErrors.push("Invalid request type");
    }
    if (
      typeof successType !== "string" &&
      typeof successType !== "symbol" &&
      !isValidTypeDescriptor(successType)
    ) {
      validationErrors.push("Invalid success type");
    }
    if (
      typeof failureType !== "string" &&
      typeof failureType !== "symbol" &&
      !isValidTypeDescriptor(failureType)
    ) {
      validationErrors.push("Invalid failure type");
    }
  }
  if (typeof fetch !== "undefined") {
    if (typeof fetch !== "function") {
      validationErrors.push("[RSAA].fetch property must be a function");
    }
  }
  return validationErrors;
}
exports.validateRSAA = validateRSAA;
function isValidRSAA(action) {
  return !validateRSAA(action).length;
}
exports.isValidRSAA = isValidRSAA;
