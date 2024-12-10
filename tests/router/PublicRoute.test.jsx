import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";

describe("Testing <PublicRoute />", () => {
  test("should show children if user is not authenticated", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1> Public Router </h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Public Router")).toBeTruthy();
  });

  test("should navigate if user is authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Strider",
        id: "ABC123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        {/* <MemoryRouter initialEntries={["/login"]}> */}
        <MemoryRouter initialEntries={["/marvel"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1> Login </h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1> Marvel </h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Marvel")).toBeTruthy();
  });
});
