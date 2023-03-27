import Header from "../../../components/Layout/Header";
import { Fragment } from "react";
import { fetchFavorites, selectAll, wrapper } from "../../../redux";
import Head from "next/head";
import VideosList from "../../../components/Video/VideosList";
import { useSelector, useStore } from "react-redux";
import { useSession } from "next-auth/react";
import MustLoginPage from "../../MustLogin";

const Favorites = () => {
  const videos = useSelector(selectAll());
  console.log("State on render5", useStore().getState());

  const session = useSession();
  const isLoggedIn = session.data ? true : false;

  return (
    <Fragment>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      {isLoggedIn && <VideosList videos={videos || []} />}

      {!isLoggedIn && <MustLoginPage />}
    </Fragment>
  );
};

export default Favorites;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { id } = params;
      await store.dispatch(fetchFavorites(id));
    }
);
