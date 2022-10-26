import styles from "./VideoDetail.module.css";

import { useRouter } from "next/router";
import Card from "../UI/Card";
import { Bookmark } from "../../styles/Icons";
import { Share } from "../../styles/Icons";
import { Download } from "../../styles/Icons";
import { useState } from "react";

const VideoDetail = (props) => {
  const [classesOfShare, setClassesOfShare] = useState(
    `${(styles.shareAlert, "hidden")}`
  );

  const shareHandler = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(window.location.href);
    setClassesOfShare(`${styles.shareAlert}`);
    setTimeout(() => {
      setClassesOfShare(`${(styles.shareAlert, "hidden")}`);
    }, 1000);
  };
  return (
    <Card className={styles.detail}>
      <a href="mailto: abc@example.com" className={styles.removePost}>
        Bu videoyu kaldırtmak için tıklayınız...
      </a>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <span className={classesOfShare}>Copied to clipboard</span>
      <div className={styles.icons}>
        <button>
          <span>
            <Bookmark />
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

/*
<video width="320" height="240" controls>
        <source src="videolinki" type="video/mp4"></source>
      </video>
*/
