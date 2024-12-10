import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
describe("Testing <Navbar />", () => {
  test("should show the user name", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Strider",
        id: "ABC123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
  });

  test("should call logout and navigate when clicked in the button", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Strider",
        id: "ABC123",
      },
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
