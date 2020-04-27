/*
 * src/store.js
 * No initialState
 */
import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";
import { initialState } from "../../common/constant";
import { State } from "../../types/redux.types";
import reducer from "../reducers/reducer";
import { Settings } from "../../types/app.type";

const composeEnhancers: typeof compose = compose;

// gets starting state settings from localStorage if present,
// otherwise sets as default initial state
export function getSettingsFromStorage(): Settings | undefined {
  const storageItem: string | null =
    localStorage !== undefined
      ? localStorage.getItem("inspectNextState")
      : null;
  const { settings }: { settings: Settings } = JSON.parse(storageItem!) as {
    settings: Settings;
  };

  return settings ? settings : undefined;
}

export function configureStore(state: State = initialState): Store {
  return createStore(reducer, state, composeEnhancers(applyMiddleware(thunk)));
}
