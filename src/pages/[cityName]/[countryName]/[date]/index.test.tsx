import React from "react";
import { render } from "@testing-library/react";
import DatePage from "./index";
import { initialState } from "../../../../common/constant";
import { Provider } from "react-redux";
import store from "../../../../redux/store/store";
import { mockRouter, mockFetch } from "../../../../test/support";
import { Location } from "../../../../types/location.type";

test("renders Date Page", () => {
  const query: Location = { cityName: "Sydney", countryName: "Australia" };
  mockRouter(query);
  mockFetch();
  const { getByText } = render(
    <Provider store={store}>
      <DatePage
        params={{
          cityName: "sydney",
          countryName: "australia",
          date: "April-12-20",
        }}
        state={initialState}
      />
    </Provider>
  );
  const backElement = getByText(/Back to week/i);
  expect(backElement).toBeVisible();
});
