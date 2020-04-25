import React from "react";
import { render } from "@testing-library/react";
import HomePage from "../index.page";
import { Provider } from "react-redux";
import store from "../../redux/store/store";

test("renders Home Page", () => {
  const { getByText } = render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
  const headElement = getByText(/Inspect Next/i);
  expect(headElement).not.toBeNull();
});
