import React from "react";
import { render } from "@testing-library/react";

test("renders Location not found Page", () => {
  const { getByText } = render(
    <Provider store={store}>
      <LocationNotFound />
    </Provider>
  );
  const backElement = getByText(/No data found for that location/i);
  expect(backElement).toBeInTheDocument();
});
