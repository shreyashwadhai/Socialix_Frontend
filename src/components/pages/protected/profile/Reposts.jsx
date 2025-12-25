import { Stack, Typography, useMediaQuery } from "@mui/material";
import HomePost from "../../../home/HomePost";
import { useSelector } from "react-redux";

const Reposts = () => {
  const { user } = useSelector((state) => state.service);

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");
  return (
    <>
      {user ? (
        user.user ? (
          user.user.reposts.length > 0 ? (
            <Stack
              flexDirection={"column"}
              gap={2}
              mb={10}
              width={_400 ? "800px" : "100%"}
              mx={"auto"}
            >
              {user.user.reposts.map((e) => {
                return <HomePost key={e._id} e={e} />;
              })}
            </Stack>
          ) : (
            <Typography textAlign={"center"} variant="h6">
              No Repost yet !
            </Typography>
          )
        ) : (
          <Typography textAlign={"center"} variant="h6">
            No Repost yet !
          </Typography>
        )
      ) : (
        <Typography textAlign={"center"} variant="h6">
          No Repost yet !
        </Typography>
      )}
    </>
  );
};

export default Reposts;
