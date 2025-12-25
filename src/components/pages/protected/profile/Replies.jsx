import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Comments from "../../../home/post/Comments";
import { useSelector } from "react-redux";

const Replies = () => {
  const { user } = useSelector((state) => state.service);

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        width={_400 ? "800px" : "90%"}
        mx={"auto"}
      >
        {user ? (
          user.user ? (
            user.user.replies.length > 0 ? (
              user.user.replies.map((e) => {
                return <Comments key={e._id} e={e} postId={e.post} />;
              })
            ) : (
              <Typography textAlign={"center"} variant="h6">
                No replies yet !
              </Typography>
            )
          ) : null
        ) : null}
      </Stack>
    </>
  );
};

export default Replies;
