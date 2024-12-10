const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const { SearchPage } = require("../../../src/heroes/pages/SearchPage");

const mockerUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockerUseNavigate,
}));

describe("Testing SearchPage", () => {
  test("should render default values", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("should render batman and input with value of queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("/assets/heroes/dc-batman.jpg");

    const alert = screen.getByLabelText("alert-danger");

    expect(alert.style.display).toBe("none");
  });

  test("should render an error if not find a hero (Batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText("alert-danger");

    expect(alert.style.display).not.toBe("none");
  });

  test("should called navigate to new screen", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "superman" } });

    expect(input.value).toBe("superman");

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockerUseNavigate).toHaveBeenCalledWith(`?q=superman`);
  });
});
