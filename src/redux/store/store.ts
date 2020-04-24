/*
 * src/store.js
 * No initialState
 */
import { createStore, applyMiddleware, Store, compose } from "redux";
import thunk from "redux-thunk";
import { initialState } from "../../common/constant";
import { State, Action } from "../../types/redux.types";
import reducer from "../reducers/reducer";

const composeEnhancers: typeof compose = compose;

// // gets starting state settings from localStorage if present,
// // otherwise sets as default initial state
// function getStartState(): State {
//   // const storageItem: string | null =
//   //   localStorage !== undefined
//   //     ? localStorage.getItem("inspectNextState")
//   //     : null;
//   // const state: Partial<State> | null = JSON.parse(storageItem!) as Partial<
//   //   State
//   // >;

//   // if (state !== null && state.settings !== undefined) {
//   //   return { ...initialState, settings: state.settings };
//   // }

//   return initialState;
// }

export function configureStore(state: State = initialState): Store {
  return createStore(reducer, state, composeEnhancers(applyMiddleware(thunk)));
}

const store: Store<State, Action> = configureStore();

store.subscribe((): void => {
  if (localStorage !== undefined) {
    localStorage.setItem(
      "inspectNextState",
      JSON.stringify({ settings: store.getState().settings })
    );
  }
});

export default store;
