import styles from "./VideoDetail.module.css";

import Card from "../UI/Card";
import { Bookmark } from "../../styles/Icons";
import { Share } from "../../styles/Icons";
import { Download } from "../../styles/Icons";
import { useState } from "react";
import { useSession } from "next-auth/react";

const VideoDetail = (props) => {
  const [bookmarkedVideo, setBookmarkedVideo] = useState(false);
  const [classesOfShare, setClassesOfShare] = useState(
    `${(styles.shareAlert, "hidden")}`
  );
  const session = useSession();
  const isLoggedIn = session.data ? true : false;

  const shareHandler = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(window.location.href);
    setClassesOfShare(`${styles.shareAlert}`);
    setTimeout(() => {
      setClassesOfShare(`${(styles.shareAlert, "hidden")}`);
    }, 1000);
  };

  const bookmarkVideo = async () => {
    if (!isLoggedIn) {
      return;
    }
    if (bookmarkedVideo) {
      setBookmarkedVideo(false);
      await fetch("http://localhost:8080/users/fav", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.id),
      });
    } else {
      setBookmarkedVideo(true);
      await fetch("http://localhost:8080/users/fav", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.id),
      });
    }
  };
  return (
    <Card className={styles.detail}>
      <a href="mailto: abc@example.com" className={styles.removePost}>
        Click here to remove this video...
      </a>
      <iframe allowFullScreen="true" src={props.url} alt={props.title} />
      <h1>{props.title}</h1>
      <span className={classesOfShare}>Copied to clipboard</span>
      <div className={styles.icons}>
        <button onClick={bookmarkVideo}>
          <span className={isLoggedIn ? "" : styles.hovertext}>
            <Bookmark bookmarked={bookmarkedVideo} />
          </span>
        </button>

        <button onClick={shareHandler}>
          <span>
            <Share />
          </span>
        </button>
        <button>
          <span>
            <Download />
          </span>
        </button>
      </div>
      <p>{props.description}</p>
    </Card>
  );
};

export default VideoDetail;
