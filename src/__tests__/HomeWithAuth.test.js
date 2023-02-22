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

// The mock here simulate that HOC is sending the Auth validation
jest.mock("../hoc/withAuth", () => (Component) => (props) => {
  return <Component {...props} isAuth />;
});

describe("Check Home connection state", () => {
  test("User is connected", () => {
    const component = (
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    render(component);

    // Apps link is only visible if user is connected
    const appsLink = screen.getByRole("link", { name: /Apps/i });
    expect(appsLink).toBeInTheDocument();
  });
});
