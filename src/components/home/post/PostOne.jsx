// import {
//   Avatar,
//   AvatarGroup,
//   Badge,
//   Stack,
//   Stepper,
//   useMediaQuery,
// } from "@mui/material";
// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const PostOne = ({ e }) => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const { darkMode } = useSelector((state) => state.service);

//   return (
//     <Stack
//       flexDirection={"column"}
//       alignItems={"center"}
//       justifyContent={"space-between"}
//       gap={2}
//     >
//       <motion.div whileHover={{ scale: 1.05 }}>
//         <Link to={`/profile/posts/${e?.admin._id}`}>
//           <Badge
//             overlap="circular"
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             badgeContent={
//               <Avatar
//                 alt="+"
//                 src=""
//                 sx={{
//                   width: _650 ? 20 : 14,
//                   height: _650 ? 20 : 14,
//                   bgcolor: darkMode ? "#bb86fc" : "#6a1b9a",
//                   color: "white",
//                 }}
//               >
//                 +
//               </Avatar>
//             }
//           >
//             <Avatar
//               alt={e ? e.admin.userName : ""}
//               src={e ? e.admin.profilePic : ""}
//               sx={{
//                 width: _650 ? 48 : 36,
//                 height: _650 ? 48 : 36,
//                 border: `2px solid ${darkMode ? "#333" : "#e0e0e0"}`,
//               }}
//             />
//           </Badge>
//         </Link>
//       </motion.div>

//       <Stack
//         flexDirection={"column"}
//         alignItems={"center"}
//         gap={2}
//         height={"100%"}
//       >
//         <Stepper
//           orientation={"vertical"}
//           activeStep={0}
//           sx={{
//             borderLeft: `2px solid ${darkMode ? "#333" : "#e0e0e0"}`,
//             width: "0px",
//             height: "100%",
//             minHeight: "60px",
//           }}
//         />

//         {/* {e?.comments?.length > 0 && (
//           <motion.div whileHover={{ scale: 1.05 }}>
//             <AvatarGroup
//               total={e.comments.length}
//               sx={{
//                 "& .MuiAvatar-root": {
//                   width: _650 ? 28 : 20,
//                   height: _650 ? 28 : 20,
//                   fontSize: _650 ? 12 : 8,
//                   borderColor: darkMode ? "#333" : "#e0e0e0",
//                   backgroundColor: darkMode ? "#333" : "#f5f5f5",
//                 },
//               }}
//             >
//               {e.comments.slice(0, 2).map((comment, index) => {
//                 return (
//                   <div>
//                     {console.log(comment)}
//                     <Avatar
//                       key={index}
//                       src={comment.admin.profilePic}
//                       alt={comment.admin.userName}
//                       sx={{
//                         width: _650 ? 28 : 20,
//                         height: _650 ? 28 : 20,
//                         borderColor: darkMode ? "#333" : "#e0e0e0",
//                         color: darkMode ? "#fff" : "#000",
//                       }}
//                     />
//                   </div>
//                 );
//               })}
//             </AvatarGroup>
//           </motion.div>
//         )} */}

//         {e ? (
//           e.comments.length > 0 ? (
//             <AvatarGroup
//               total={e?.comments.length}
//               // max={3}
//               sx={{
//                 "& .MuiAvatar-root": {
//                   width: _650 ? 24 : 16,
//                   height: _650 ? 24 : 16,
//                   fontSize: _650 ? 12 : 8,
//                   color: darkMode ? "black" : "white",
//                 },
//               }}
//             >
//               {/* {console.log(e?.comments[0].admin)} */}
//               <Avatar
//                 src={e?.comments[0].admin.profilePic}
//                 alt={e?.comments[0].admin.userName}
//               />
//               {e.comments.length > 1 ? (
//                 <Avatar
//                   src={e?.comments[1].admin.profilePic}
//                   alt={e?.comments[1].admin.userName}
//                 />
//               ) : null}
//             </AvatarGroup>
//           ) : (
//             ""
//           )
//         ) : (
//           ""
//         )}
//       </Stack>
//     </Stack>
//   );
// };

// export default PostOne;



import {
  Avatar,
  AvatarGroup,
  Badge,
  Stack,
  Stepper,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PostOne = ({ e }) => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const { darkMode } = useSelector((state) => state.service);

  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={2}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to={`/profile/posts/${e?.admin._id}`}>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <Avatar
                alt="+"
                src=""
                sx={{
                  width: _650 ? 20 : 14,
                  height: _650 ? 20 : 14,
                  background: "linear-gradient(135deg, #6a1b9a, #9c27b0)",
                  color: "white",
                  border: `2px solid ${darkMode ? "#333" : "#fff"}`,
                }}
              >
                +
              </Avatar>
            }
          >
            <Avatar
              alt={e ? e.admin.userName : ""}
              src={e ? e.admin.profilePic : ""}
              sx={{
                width: _650 ? 48 : 36,
                height: _650 ? 48 : 36,
                border: "2px solid #6a1b9a",
              }}
            />
          </Badge>
        </Link>
      </motion.div>

      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        height={"100%"}
      >
        <Stepper
          orientation={"vertical"}
          activeStep={0}
          sx={{
            borderLeft: `2px dashed ${darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
            width: "0px",
            height: "100%",
            minHeight: "60px",
          }}
        />

        {e?.comments?.length > 0 && (
          <motion.div whileHover={{ scale: 1.05 }}>
            <AvatarGroup
              total={e.comments.length}
              sx={{
                "& .MuiAvatar-root": {
                  width: _650 ? 28 : 20,
                  height: _650 ? 28 : 20,
                  fontSize: _650 ? 12 : 8,
                  border: `2px solid ${darkMode ? "#333" : "#fff"}`,
                  background: darkMode
                    ? "linear-gradient(135deg, #333, #444)"
                    : "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
                },
              }}
            >
              {e.comments.slice(0, 2).map((comment, index) => (
                <Avatar
                  key={index}
                  src={comment.admin.profilePic}
                  alt={comment.admin.userName}
                />
              ))}
            </AvatarGroup>
          </motion.div>
        )}
      </Stack>
    </Stack>
  );
};

export default PostOne;