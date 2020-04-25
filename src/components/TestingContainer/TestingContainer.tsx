import { Provider } from "react-redux";
import React from "react";
import { Store, Action } from "redux";
import withRedux from "next-redux-wrapper";
import "../styles/DayPreviewItem.scss";
import "../styles/DayPreviewList.css";
import "../styles/Footer.scss";
import "../styles/HourInfoTable.scss";
import "../styles/LocationNotFound.scss";
import "../styles/SettingsModal.scss";
import "../styles/Typography.scss";
import { State } from "../../types/redux.types";
import { configureStore } from "../../redux/store/store";

const TestingContainer = (props: {
  Component: any;
  pageProps: any;
  store: Store<State, Action>;
}): JSX.Element => {
  const { Component, pageProps, store } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default withRedux(configureStore)(TestingContainer);
