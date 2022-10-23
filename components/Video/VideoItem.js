import { useRouter } from "next/router";

const VideoItem = (props) => {
  const router = useRouter();

  const title =
    props.title.length > 30 ? props.title.slice(0, 27) + "..." : props.title;

  const goDetailPage = () => {
    router.push("/" + props.id);
  };

  //img üstüne <Link>
  //div içinde desc üstüne link
  return (
    <li onClick={goDetailPage}>
      <img src={props.img} alt={props.title}></img>
      <div>
        <h3>{title}</h3>
        {/*buraya yıldız olayını ekle*/}
        {/*comments ekle*/}
      </div>
    </li>
  );
};

export default VideoItem;
