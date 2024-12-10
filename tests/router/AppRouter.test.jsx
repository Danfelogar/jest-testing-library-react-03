import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe("Testing <AppRouter />", () => {
  test("should show render login if the user does not authenticate", () => {
    const contextValue = { logged: false };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("should show the marvel component if the user is authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Strider",
        id: "ABC123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
});
