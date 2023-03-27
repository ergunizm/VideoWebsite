import "../styles/globals.css";

import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "../redux/index";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, session, ...rest }) => {
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...props.pageProps} key={router.asPath} />
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
