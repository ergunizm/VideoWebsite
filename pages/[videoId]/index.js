import { Fragment } from "react";
import Header from "../../components/Layout/Header";
import VideoDetail from "../../components/Video/VideoDetail";

import { useStore } from "react-redux";
import { fetchVideo, wrapper } from "../../redux/index";

const VideoDetails = (props) => {
  console.log("State on render", useStore().getState(), props);
  const singleVideo = props.video;

  return (
    <Fragment>
      <Header />
      <VideoDetail
        image={singleVideo.images[0]}
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
