// import { Stack, Typography, useMediaQuery } from "@mui/material";
// import { Link } from "react-router-dom";
// import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
// import { IoHeart } from "react-icons/io5";
// import { FaRetweet } from "react-icons/fa6";
// import { IoIosSend } from "react-icons/io";
// import { useSelector } from "react-redux";
// import { useLikePostMutation, useRepostMutation } from "../../../redux/service";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const PostTwo = ({ e }) => {
//   const { darkMode, myInfo } = useSelector((state) => state.service);
//   const [likePost] = useLikePostMutation();
//   const [repost] = useRepostMutation();
//   const [isLiked, setIsLiked] = useState(false);

//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _500 = useMediaQuery("(min-width:500px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const handleLike = async () => {
//     await likePost(e?._id);
//   };

//   const checkIsLiked = () => {
//     if (e?.likes?.length > 0) {
//       setIsLiked(e.likes.some((ele) => ele._id === myInfo._id));
//     } else {
//       setIsLiked(false);
//     }
//   };

//   const handleRepost = async () => {
//     await repost(e?._id);
//   };

//   useEffect(() => {
//     checkIsLiked();
//   }, [e, myInfo]);

//   return (
//     <Stack flexDirection={"column"} gap={2} width={"100%"}>
//       <Stack flexDirection={"column"} gap={1.5}>
//         <Typography
//           variant="h6"
//           fontSize={_400 ? "1.1rem" : "0.9rem"}
//           fontWeight={"bold"}
//           color={darkMode ? "white" : "#1a1a1a"}
//         >
//           {e?.admin.userName || ""}
//         </Typography>

//         <Link to={`post/${e?._id}`} style={{ textDecoration: "none" }}>
//           <Typography
//             variant="body1"
//             fontSize={_650 ? "1.1rem" : _400 ? "1rem" : "0.9rem"}
//             color={darkMode ? "#e0e0e0" : "#333"}
//             sx={{
//               lineHeight: 1.4,
//               "&:hover": {
//                 color: darkMode ? "#bb86fc" : "#6a1b9a",
//               },
//             }}
//           >
//             {e?.text || ""}
//           </Typography>
//         </Link>

//         {e?.media && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <img
//               src={e.media}
//               alt="Post media"
//               loading="lazy"
//               style={{
//                 width: _650 ? "100%" : "100%",
//                 maxWidth: "500px",
//                 height: "auto",
//                 borderRadius: "12px",
//                 marginTop: "8px",
//                 border: `1px solid ${darkMode ? "#333" : "#e0e0e0"}`,
//               }}
//             />
//           </motion.div>
//         )}
//       </Stack>

//       <Stack flexDirection={"column"} gap={1}>
//         <Stack flexDirection={"row"} justifyContent={"space-between"} px={1}>
//           {[
//             {
//               icon: isLiked ? (
//                 <IoHeart size={24} color="#ff4081" />
//               ) : (
//                 <FaRegHeart size={24} color={darkMode ? "#b0b0b0" : "#666"} />
//               ),
//               action: handleLike,
//               count: e?.likes?.length || 0,
//               label: "likes",
//             },
//             {
//               icon: (
//                 <FaRegComment size={24} color={darkMode ? "#b0b0b0" : "#666"} />
//               ),
//               action: null,
//               count: e?.comments?.length || 0,
//               label: "comments",
//             },
//             {
//               icon: (
//                 <FaRetweet size={24} color={darkMode ? "#b0b0b0" : "#666"} />
//               ),
//               action: handleRepost,
//               count: e?.reposts?.length || 0,
//               label: "reposts",
//             },
//             {
//               icon: (
//                 <IoIosSend size={24} color={darkMode ? "#b0b0b0" : "#666"} />
//               ),
//               action: null,
//               count: 0,
//               label: "shares",
//             },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={item.action}
//               style={{ cursor: "pointer" }}
//             >
//               <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
//                 {item.icon}
//                 {item.count > 0 && (
//                   <Typography
//                     variant="caption"
//                     color={darkMode ? "#b0b0b0" : "#666"}
//                     fontSize={"0.8rem"}
//                   >
//                     {item.count}
//                   </Typography>
//                 )}
//               </Stack>
//             </motion.div>
//           ))}
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default PostTwo;


import { Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { FaRetweet } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLikePostMutation, useRepostMutation } from "../../../redux/service";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PostTwo = ({ e }) => {
  const { darkMode, myInfo } = useSelector((state) => state.service);
  const [likePost] = useLikePostMutation();
  const [repost] = useRepostMutation();
  const [isLiked, setIsLiked] = useState(false);

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const handleLike = async () => {
    await likePost(e?._id);
  };

  const checkIsLiked = () => {
    if (e?.likes?.length > 0) {
      setIsLiked(e.likes.some((ele) => ele._id === myInfo._id));
    } else {
      setIsLiked(false);
    }
  };

  const handleRepost = async () => {
    await repost(e?._id);
  };

  useEffect(() => {
    checkIsLiked();
  }, [e, myInfo]);

  return (
    <Stack flexDirection={"column"} gap={2} width={"100%"}>
      <Stack flexDirection={"column"} gap={1.5}>
        <Typography
          variant="h6"
          fontSize={_400 ? "1.1rem" : "0.9rem"}
          fontWeight={"bold"}
          color={darkMode ? "white" : "#1a1a1a"}
        >
          {e?.admin.userName || ""}
        </Typography>

        <Link to={`post/${e?._id}`} style={{ textDecoration: "none" }}>
          <Typography
            variant="body1"
            fontSize={_650 ? "1.1rem" : _400 ? "1rem" : "0.9rem"}
            color={darkMode ? "#e0e0e0" : "#333"}
            sx={{
              lineHeight: 1.4,
              "&:hover": {
                color: "#6a1b9a",
              },
            }}
          >
            {e?.text || ""}
          </Typography>
        </Link>

        {e?.media && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <img
              src={e.media}
              alt="Post media"
              loading="lazy"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "12px",
                marginTop: "8px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
                boxShadow: darkMode
                  ? "0 4px 12px rgba(0,0,0,0.3)"
                  : "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </motion.div>
        )}
      </Stack>

      <Stack flexDirection={"column"} gap={1}>
        <Stack flexDirection={"row"} justifyContent={"space-between"} px={1}>
          {[
            {
              icon: isLiked ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <IoHeart size={24} color="#ff4081" />
                </motion.div>
              ) : (
                <FaRegHeart size={24} color={darkMode ? "#b0b0b0" : "#666"} />
              ),
              action: handleLike,
              count: e?.likes?.length || 0,
              label: "likes",
            },
            {
              icon: (
                <FaRegComment size={24} color={darkMode ? "#b0b0b0" : "#666"} />
              ),
              action: null,
              count: e?.comments?.length || 0,
              label: "comments",
            },
            {
              icon: (
                <FaRetweet size={24} color={darkMode ? "#b0b0b0" : "#666"} />
              ),
              action: handleRepost,
              count: e?.reposts?.length || 0,
              label: "reposts",
            },
            {
              icon: (
                <IoIosSend size={24} color={darkMode ? "#b0b0b0" : "#666"} />
              ),
              action: null,
              count: 0,
              label: "shares",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={item.action}
              style={{ cursor: item.action ? "pointer" : "default" }}
            >
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                {item.icon}
                {item.count > 0 && (
                  <Typography
                    variant="caption"
                    color={darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
                    fontSize={"0.8rem"}
                  >
                    {item.count}
                  </Typography>
                )}
              </Stack>
            </motion.div>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostTwo;