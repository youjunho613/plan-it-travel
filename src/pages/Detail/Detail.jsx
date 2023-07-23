import { useParams } from "react-router-dom";
import { DetailMap } from "components/DetailMap";
import { Comment } from "components/Comment";

export const Detail = () => {
  const params = useParams();
  const paramsId = params.id;
  return (
    <>
      <DetailMap paramsId={paramsId} />
      <Comment paramsId={paramsId} />
    </>
  );
};
