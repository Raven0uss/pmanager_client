import { render, screen } from "@testing-library/react";
import Home from "../pages/Home.jsx";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Check Home connection state", () => {
  test("User is disconnected", () => {
    const component = (
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    render(component);

    // The Sign Up link is only visible if user is disconnected
    const signUpLink = screen.getByRole("link", { name: /Sign Up/i });
    expect(signUpLink).toBeInTheDocument();
  });
});
