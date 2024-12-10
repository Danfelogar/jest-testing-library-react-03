import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe("Testing authReducer", () => {
  test("should return default state", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("should call login authentication and set user", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Danfelogar",
        id: "123",
      },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("should call logout an delete user name and set logged to false", () => {
    const state = {
      logged: true,
      user: {
        name: "Danfelogar",
        id: "123",
      },
    };

    const action = {
      type: types.logout,
    };
    const newState = authReducer(state, action);

    expect(newState).toEqual({ logged: false });
  });
});
