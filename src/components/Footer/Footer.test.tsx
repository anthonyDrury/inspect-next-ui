import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from "../../redux/store/store";

test("renders Home Link", (): void => {
  const { getByText } = render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
  const homeLink = getByText(/Home/i);
  const emaiText = getByText(/admin@inspectnext.com/i);

  expect(homeLink).toBeVisible();
  expect(emaiText).toBeVisible();
});
