// import {
//   Avatar,
//   Button,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addPostModel } from "../../redux/slice";

// const HomeInput = () => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const dispatch = useDispatch();
//   const { darkMode, myInfo } = useSelector((state) => state.service);

//   const handleAddPost = () => {
//     dispatch(addPostModel(true));
//   };

//   return (
//     <>
//       {_650 ? (
//         <Stack
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           width={_400 ? "60%" : "90%"}
//           height={28}
//           p={3}
//           borderBottom={"2px solid gray"}
//           my={5}
//           mx={"auto"}
//           onClick={handleAddPost}
//         >
//           <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
//             <Avatar
//               src={myInfo ? myInfo.profilePic : ""}
//               alt={myInfo ? myInfo.userName : ""}
//             />
//             <Typography color={"GrayText"}>Start with Post...</Typography>
//           </Stack>
//           <Button
//             size="medium"
//             sx={{
//               bgcolor: darkMode ? "aliceblue" : "gray",
//               color: darkMode ? "black" : "aliceblue",
//               ":hover": { bgcolor: "black" },
//               borderRadius: "3rem",
//             }}
//           >
//             POST
//           </Button>
//         </Stack>
//       ) : (
//         <Stack marginBottom={"2rem"}></Stack>
//       )}
//     </>
//   );
// };

// export default HomeInput;


import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../redux/slice";
import { motion } from "framer-motion";

const HomeInput = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const dispatch = useDispatch();
  const { darkMode, myInfo } = useSelector((state) => state.service);

  const handleAddPost = () => {
    dispatch(addPostModel(true));
  };

  return (
    <>
      {_650 ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"600px"}
            p={3}
            mx={"auto"}
            my={3}
            sx={{
              background: darkMode
                ? "linear-gradient(to right, rgba(30,30,30,0.9), rgba(40,40,40,0.9))"
                : "linear-gradient(to right, rgba(255,255,255,0.9), rgba(245,245,245,0.9))",
              borderRadius: "16px",
              boxShadow: darkMode
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.1)",
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(106,27,154,0.1) 0%, rgba(106,27,154,0) 70%)",
                filter: "blur(10px)",
              },
              ":hover": {
                boxShadow: darkMode
                  ? "0 12px 40px rgba(0, 0, 0, 0.4)"
                  : "0 12px 40px rgba(0, 0, 0, 0.15)",
              },
            }}
            onClick={handleAddPost}
          >
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <Avatar
                src={myInfo ? myInfo.profilePic : ""}
                alt={myInfo ? myInfo.userName : ""}
                sx={{
                  border: "2px solid #6a1b9a",
                }}
              />
              <Typography color={darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}>
                Start with Post...
              </Typography>
            </Stack>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="medium"
                sx={{
                  background: "linear-gradient(135deg, #6a1b9a, #9c27b0)",
                  color: "#fff",
                  ":hover": {
                    background: "linear-gradient(135deg, #7b1fa2, #ab47bc)",
                  },
                  borderRadius: "3rem",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  boxShadow: "0 4px 12px rgba(106, 27, 154, 0.3)",
                }}
              >
                POST
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      ) : (
        <Stack marginBottom={"2rem"}></Stack>
      )}
    </>
  );
};

export default HomeInput;