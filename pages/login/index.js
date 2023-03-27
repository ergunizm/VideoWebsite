import { Fragment } from "react";
import Head from "next/head";
import Header from "../../components/Layout/Header";
import LoginPage from "../../components/Login/LoginPage";
import { useStore } from "react-redux";
import { useSession } from "next-auth/react";

export default function Login() {
  console.log("State on render4", useStore().getState());

  const session = useSession();
  console.log(session.data);

  return (
    <Fragment>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <LoginPage />
    </Fragment>
  );
}
