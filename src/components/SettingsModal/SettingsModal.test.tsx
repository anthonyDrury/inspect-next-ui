import React from "react";
import { render, getByTestId, queryByTestId } from "@testing-library/react";
import { Provider } from "react-redux";
import store, { configureStore } from "../../redux/store/store";
import SettingsModal from "./SettingsModal";
import { initialState } from "../../common/constant";

test("renders SettingsModal", (): void => {
  const { container } = render(
    <Provider store={store}>
      <SettingsModal />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  expect(gearIconButton).not.toBeNull();

  expect(queryByTestId(container, "settings-modal-header")).toBeNull();
});

test("clicking the gear button opens the settings modal", (): void => {
  const { container } = render(
    <Provider store={store}>
      <SettingsModal />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  gearIconButton.click();

  const modalHeader = document.getElementById("settings-modal-header");

  expect(modalHeader).not.toBeNull();
});

it("clicking the close button closes the settings modal", (): void => {
  const { container } = render(
    <Provider store={store}>
      <SettingsModal />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  gearIconButton.click();

  const modalCloseButton = document.getElementById("settings-modal-close");
  expect(modalCloseButton).not.toBeNull();
  modalCloseButton!.click();

  const modalHeader = document.getElementById("settings-modal-header");
  expect(modalHeader).not.toBeVisible();
});

test("clicking the reset button triggers the reset action", (): void => {
  const resetSettings = jest.fn();
  const mockStore = configureStore(initialState);
  const { container } = render(
    <Provider store={mockStore}>
      <SettingsModal {...{ resetSettings }} />
    </Provider>
  );
  const gearIconButton = getByTestId(container, "gear-icon");
  gearIconButton.click();

  const resetButton = document.getElementById("settings-modal-reset");
  expect(resetButton).not.toBeNull();
  resetButton!.click();

  expect(resetSettings).toHaveBeenCalledTimes(1);
});
