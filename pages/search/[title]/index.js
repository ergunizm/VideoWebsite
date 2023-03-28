import Head from "next/head";
import { Fragment } from "react";
import VideosList from "../../../components/Video/VideosList";
import Header from "../../../components/Layout/Header";

import { useSelector, useStore } from "react-redux";
import { fetchSearchResults, selectAll, wrapper } from "../../../redux";

export default function SearchResult() {
  const videos = useSelector(selectAll());
  console.log("State on render3", useStore().getState());

  return (
    <Fragment>
      <Head>
        <title>Morningstar</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <VideosList videos={videos || []} />
    </Fragment>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { title } = params;

      await store.dispatch(fetchSearchResults(title));
      console.log("State on server3", store.getState());
    }
);
