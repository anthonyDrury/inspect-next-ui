import { render, queryByTestId } from "@testing-library/react";
import React from "react";
import CityInput from "./CityInput";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { mount } from "enzyme";

test("renders CityInput with search field hidden", (): void => {
  const { container } = render(
    <Provider store={store}>
      <CityInput />
    </Provider>
  );

  expect(queryByTestId(container, "search-icon")).not.toBeNull();
  expect(queryByTestId(container, "search-input")).not.toBeNull();
});

test("renders CityInput with search field displayed", (): void => {
  const wrapper = mount(
    <Provider store={store}>
      <CityInput open={true} />
    </Provider>
  );

  expect(wrapper.find('[data-testid="search-icon"]').exists()).toBeFalsy();
  expect(wrapper.find('[data-testid="search-input"]').exists()).toBeTruthy();
});

test("should call autocomplete API when input made", async (): Promise<
  void
> => {
  const wrapper = mount(
    <Provider store={store}>
      <CityInput open={true} />
    </Provider>
  );

  const client = require("../../clients/server.client");
  const spy = jest.spyOn(client, "getAutocomplete").mockReturnValue(
    Promise.resolve([
      {
        description: "Sydney Australia",
        terms: [{ value: "Sydney" }, { value: "Australia" }] as any[],
      },
    ])
  );

  wrapper
    .find("input#city-input-autocomplete")
    .simulate("click")
    .simulate("change", { target: { value: "syd" } });

  expect(spy).toHaveBeenCalledTimes(1);
});
