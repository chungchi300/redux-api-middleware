import test from "tape";
import "isomorphic-fetch";
import nock from "nock";

// Public package exports
import {
  RSAA,
  CALL_API,
  isRSAA,
  validateRSAA,
  isValidRSAA,
  InvalidRSAA,
  InternalError,
  RequestError,
  ApiError,
  getJSON,
  apiMiddleware
} from "../src";

// Private module exports
import { isValidTypeDescriptor } from "../src/validation";
import { normalizeTypeDescriptors, actionWith } from "../src/util";

describe("module", () => {
  it("initial", () => {
    expect(true).toBe(true);
  });
});
