import { useContext } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { render, screen } from "@testing-library/react";

describe("Testing <PrivateRoute />", () => {
  test("should show the component if the user is authenticated", () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        name: "Strider",
        id: "ABC123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search?q=batman"]}>
          <PrivateRoute>
            <h1> Private Router </h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    //evaluate if the component is rendered and the localstorage is called
    expect(screen.getByText("Private Router")).toBeTruthy();
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/search?q=batman"
    );
  });
});
