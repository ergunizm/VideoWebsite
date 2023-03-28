import { Fragment } from "react";
import Header from "../../../components/Layout/Header";
import VideoDetail from "../../../components/Video/VideoDetail";

import { useStore } from "react-redux";
import { fetchVideo, wrapper } from "../../../redux/index";
import Head from "next/head";

const VideoDetails = (props) => {
  console.log("State on render", useStore().getState(), props);
  const singleVideo = props.video;

  return (
    <Fragment>
      <Head>
        <title>{singleVideo.title}</title>
        <meta name="description" content={singleVideo.description}></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Header />
      <VideoDetail
        id={singleVideo.id}
        url={singleVideo.videoUrl}
        description={singleVideo.description}
        title={singleVideo.title}
      />
    </Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { videoId } = params;

      const video = await store.dispatch(fetchVideo(videoId));

      console.log("State on server", store.getState());

      return {
        props: {
          video: video.payload,
        },
      };
    }
);

export default VideoDetails;
