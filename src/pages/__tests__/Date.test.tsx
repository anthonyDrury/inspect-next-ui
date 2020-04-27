import React from "react";
import { render } from "@testing-library/react";
import { Location } from "../../types/location.type";
import { mockRouter, mockFetch } from "../../test/support";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { initialState } from "../../common/constant";
import DatePage from "../[cityName]/[countryName]/[date]/index.page";

test("renders Date Page", () => {
  const query: Location = { cityName: "Sydney", countryName: "Australia" };
  mockRouter(query);
  mockFetch();
  const { getByText } = render(
    <Provider store={store}>
      <DatePage state={initialState} />
    </Provider>
  );
  const backElement = getByText(/Back to week/i);
  expect(backElement).toBeVisible();
});
