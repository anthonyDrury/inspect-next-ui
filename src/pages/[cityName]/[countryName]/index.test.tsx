import React from "react";
import { render } from "@testing-library/react";
import LocationSetPage from "./index";

test("renders Location Set Page", () => {
  const { getByText } = render(<LocationSetPage />);
  const headElement = getByText(/Forecast for/i);
  expect(headElement).toBeInTheDocument();
});
