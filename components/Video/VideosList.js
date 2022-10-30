import styles from "./VideosList.module.css";

import { useEffect, useRef, useState } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import Card from "../UI/Card";
import VideoItem from "./VideoItem";
import { LoadingSpinner } from "../../styles/Icons";

const VideosList = (props) => {
  const screenRef = useRef();
  const screenRefValue = useOnScreen(screenRef);
  const [isScreenRef, setIsScreenRef] = useState(false);

  const [selectedData, setSelectedData] = useState(props.videos.slice(0, 16));

  useEffect(() => {
    if (!isScreenRef) setIsScreenRef(screenRefValue);
  }, [screenRefValue]);

  const loadMore = () => {
    setIsScreenRef(false);
    const currlen = selectedData.length;

    if (currlen >= props.videos.length) {
      screenRef.current.remove();
      return;
    }

    if (!props.videos[currlen + 16]) {
      setSelectedData([
        ...selectedData,
        ...props.videos.slice(currlen, props.videos.length),
      ]);
    } else {
      setSelectedData([
        ...selectedData,
        ...props.videos.slice(currlen, 16 + selectedData.length),
      ]);
    }
  };

  return (
    <Card className={styles.list}>
      <ul>
        {selectedData.map((p) => (
          <VideoItem key={p.id} id={p.id} img={p.images[0]} title={p.title} />
        ))}
      </ul>
      <div ref={screenRef} className="centered">
        <LoadingSpinner />
      </div>

      {isScreenRef && loadMore()}
    </Card>
  );
};

export default VideosList;
