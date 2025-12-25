import React, { useEffect, useState } from "react";
import { Stack, TextField, useMediaQuery } from "@mui/material";
import HomePost from "../../home/HomePost";
import Comments from "../../home/post/Comments";
import { useParams } from "react-router-dom";
import {
  useAddCommentMutation,
  useSinglePostQuery,
} from "../../../redux/service";

const SinglePost = () => {
  const params = useParams();
  const [comment, setComment] = useState("");

  const { data, refetch } = useSinglePostQuery(params?.id);
  const [addComment, addCommentData] = useAddCommentMutation();

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const handleAddComment = async (e) => {
    console.log(e.key);

    if (data && e.key === "Enter") {
      const info = {
        id: data.post._id,
        text: comment,
      };
      await addComment(info);
    }
  };

  useEffect(() => {
    if (addCommentData.isSuccess) {
      setComment();
      refetch();
      console.log(addCommentData.data);
    }
    if (addCommentData.isError) {
      console.log(addCommentData.error.data);
    }
  }, [addCommentData.isSuccess, addCommentData.isError]);

  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={5}>
        <HomePost e={data?.post} />
        <Stack
          flexDirection={"column"}
          gap={2}
          width={_400 ? "80%" : "100%"}
          mx={"auto"}
        >
          {data
            ? data.post.comments.length > 0
              ? data.post.comments.map((e) => {
                  return <Comments key={e._id} e={e} postId={data?.post._id} />;
                })
              : null
            : null}
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Comment here..."
          id="comment"
          sx={
            _400
              ? {
                  width: "50%",
                  mx: "auto",
                  my: 5,
                  p: 1,
                }
              : {
                  width: "90%",
                  mx: "auto",
                  // my: 5,
                  // p: 1,
                }
          }
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={handleAddComment}
          value={comment ? comment : ""}
        />
      </Stack>
    </>
  );
};

export default SinglePost;
