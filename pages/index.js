import Head from "next/head";
import { Fragment } from "react";
import VideosList from "../components/Video/VideosList";
import Header from "../components/Layout/Header";

import { useSelector, useStore } from "react-redux";
import { fetchVideos, selectAll, wrapper } from "../redux/index";

export default function Home(props) {
  console.log("State on render2", useStore().getState(), props);
  const { products: videos } = useSelector(selectAll());

  return (
    <Fragment>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/favicon.ico" />
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
