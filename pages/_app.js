import "../styles/globals.css";

import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "../redux/index";

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp;
