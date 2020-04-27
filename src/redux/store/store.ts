/*
 * src/store.js
 * No initialState
 */
import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";
import { initialState } from "../../common/constant";
import { State, Action } from "../../types/redux.types";
import reducer from "../reducers/reducer";
import { Settings } from "../../types/app.type";
import { isDefined } from "../../common/support";

const composeEnhancers: typeof compose = compose;

// gets starting state settings from localStorage if present,
// otherwise sets as default initial state
export function getSettingsFromStorage(): Settings | undefined {
  let state: { settings: Settings } | null | undefined;
  try {
    const storageItem: string | null =
      localStorage !== undefined
        ? localStorage.getItem("inspectNextState")
        : null;
    state = JSON.parse(storageItem!) as {
      settings: Settings;
    };
  } catch (error) {
    state = undefined;
  }

  return isDefined(state) ? state!.settings : undefined;
}

export function configureStore(state: State = initialState): Store {
  return createStore(reducer, state, composeEnhancers(applyMiddleware(thunk)));
}

const store: Store<State, Action> = configureStore();

export default store;
