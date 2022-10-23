import styles from "./VideosList.module.css";

import Card from "../UI/Card";
import VideoItem from "./VideoItem";

const VideosList = (props) => {
  return (
    <Card className={styles.list}>
      <ul>
        {props.videos.map((p) => (
          <VideoItem key={p.id} id={p.id} img={p.images[0]} title={p.title} />
        ))}
      </ul>
    </Card>
  );
};

export default VideosList;
