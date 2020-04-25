import React from "react";
import { render } from "@testing-library/react";
import LocationNotFound from "./LocationNotFound";

test("renders Location not found Page", () => {
  const { getByText } = render(<LocationNotFound />);
  const backElement = getByText(/No data found for that location/i);
  expect(backElement).not.toBeNull();
});
