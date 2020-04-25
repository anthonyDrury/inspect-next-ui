import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import LocationSetPage from "../[cityName]/[countryName]/index.page";
import { mockRouter, mockFetch } from "../../test/support";
import store from "../../redux/store/store";
import { Location } from "../../types/location.type";

test("renders Location Set Page", () => {
  const query: Location = { cityName: "Sydney", countryName: "Australia" };
  mockRouter(query);
  mockFetch();
  const { getByText } = render(
    <Provider store={store}>
      <LocationSetPage />
    </Provider>
  );
  const headElement = getByText(/Forecast for/i);
  expect(headElement).toBeVisible();
});
