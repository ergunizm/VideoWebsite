import { useRouter } from "next/router";
import Image from "next/image";

const VideoItem = (props) => {
  const router = useRouter();

  const title =
    props.title.length > 30 ? props.title.slice(0, 27) + "..." : props.title;

  const goDetailPage = () => {
    router.push("/" + props.id);
  };

  const myLoader = ({ src, width, quality }) => {
    return `${props.img}`;
  };

  //img üstüne <Link>
  //div içinde desc üstüne link
  return (
    <li onClick={goDetailPage}>
      <Image
        loader={myLoader}
        src={props.img}
        alt={props.title}
        placeholder="blur"
        priority
        width="auto"
        height="100%"
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
