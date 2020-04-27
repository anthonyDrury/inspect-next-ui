import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { render } from "@testing-library/react";

test("renders loading spinner", (): void => {
  const { container } = render(<LoadingSpinner />);
  expect(container).toBeVisible();
});
