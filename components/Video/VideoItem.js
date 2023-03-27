import { useRouter } from "next/router";
import Image from "next/image";

const VideoItem = (props) => {
  const router = useRouter();

  const title =
    props.title.length > 30 ? props.title.slice(0, 27) + "..." : props.title;

  const goDetailPage = () => {
    router.push("/videos/" + props.id);
  };

  const myLoader = ({ src, width, quality }) => {
    return `${props.img}`;
  };

  return (
    <li onClick={goDetailPage}>
      <Image
        loader={myLoader}
        src={props.img}
        alt={props.title}
        priority
        width="50"
        height="50"
      />
      <div>
        <h3>{title}</h3>
        {/*buraya yıldız olayını ekle*/}
        {/*comments ekle*/}
      </div>
    </li>
  );
};

export default VideoItem;
