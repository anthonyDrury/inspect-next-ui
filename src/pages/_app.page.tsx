import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { Store } from "redux";
import withRedux from "next-redux-wrapper";
import { State, Action } from "../types/redux.types";
import { configureStore, getSettingsFromStorage } from "../redux/store/store";
import {
  ThemeProvider,
  CssBaseline,
  Theme,
  createMuiTheme,
} from "@material-ui/core";
import NavHeader from "../components/NavHeader/NavHeader";
import Footer from "../components/Footer/Footer";
import { initGA, PageView } from "../common/analytics";
import { orange, yellow } from "@material-ui/core/colors";
import Router from "next/dist/client/router";
import "../styles/DayPreviewItem.scss";
import "../styles/DayPreviewList.css";
import "../styles/Footer.scss";
import "../styles/HourInfoTable.scss";
import "../styles/LocationNotFound.scss";
import "../styles/SettingsModal.scss";
import "../styles/Typography.scss";
import { Settings } from "../types/app.type";
import { updateSettings } from "../redux/actions/settings.actions";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const MyApp = (props: {
  Component: any;
  pageProps: any;
  store: Store<State, Action>;
}): JSX.Element => {
  const { Component, pageProps, store } = props;

  useEffect((): void => {
    const settings: Settings | undefined = getSettingsFromStorage();
    if (settings !== undefined) {
      store.dispatch(updateSettings(settings));
    }
    store.subscribe((): void => {
      if (localStorage !== undefined) {
        localStorage.setItem(
          "inspectNextState",
          JSON.stringify({ settings: store.getState().settings })
        );
      }
    });
    initGA();
    PageView();
    Router.events.on("routeChangeComplete", (): void => {
      PageView();
    });
  });
  const theme: Theme = createMuiTheme({
    palette: {
      primary: orange,
      secondary: yellow,
    },
  });
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="in-app">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavHeader />
            <Component {...pageProps} />
            <Footer />
          </ThemeProvider>
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default withRedux(configureStore)(MyApp);
