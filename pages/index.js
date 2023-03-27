import Head from "next/head";
import { Fragment } from "react";
import VideosList from "../components/Video/VideosList";
import Header from "../components/Layout/Header";

import { useSelector, useStore } from "react-redux";
import { fetchVideos, selectAll, wrapper } from "../redux/index";
import { useSession } from "next-auth/react";

export default function Home(props) {
  console.log("State on render2", useStore().getState(), props);
  const videos = useSelector(selectAll());

  const session = useSession();
  console.log(session.data);

  return (
    <Fragment>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <VideosList videos={videos || []} />
    </Fragment>
  );
}

export const getServerSideProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(fetchVideos());

    console.log("State on server2", store.getState());
  }
);
