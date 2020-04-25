import React from "react";
import { render } from "@testing-library/react";
import NavHeader from "./NavHeader";
import { Provider } from "react-redux";
import store from "../../redux/store/store";

test("renders test", (): void => {
  const { getByText } = render(
    <Provider store={store}>
      <NavHeader />
    </Provider>
  );
  const testElement = getByText(/Inspect Next/i);
  expect(testElement).not.toBeNull();
});
