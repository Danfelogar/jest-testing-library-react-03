import { types } from "../../../src/auth/types/types";

describe("Testing Types.js", () => {
  test("should return this types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});
