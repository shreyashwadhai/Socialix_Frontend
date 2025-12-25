// import { Stack, Typography, useMediaQuery } from "@mui/material";
// import { IoIosMore } from "react-icons/io";
// import PostOne from "./post/PostOne";
// import PostTwo from "./post/PostTwo";
// import { useDispatch, useSelector } from "react-redux";
// import { addPostId, toggleMyMenu } from "../../redux/slice";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import PostTime from "./post/PostTime";

// const HomePost = ({ e }) => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");
//   const [isAdmin, setIsAdmin] = useState();

//   const { darkMode, myInfo } = useSelector((state) => state.service);
//   const dispatch = useDispatch();

//   const handleOpenMenu = (event) => {
//     dispatch(addPostId(e._id));
//     dispatch(toggleMyMenu(event.currentTarget));
//   };

//   const checkIsAdmin = () => {
//     if (e?.admin._id === myInfo._id) {
//       setIsAdmin(true);
//       return;
//     } else {
//       setIsAdmin(false);
//     }
//   };

//   useEffect(() => {
//     if (e && myInfo) {
//       checkIsAdmin();
//     }
//   }, [e, myInfo]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Stack
//         flexDirection={"row"}
//         justifyContent={"space-between"}
//         p={3}
//         mx={"auto"}
//         width={_650 ? "600px" : "95%"}
//         sx={{
//           backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
//           borderRadius: "16px",
//           boxShadow: darkMode
//             ? "0 4px 12px rgba(0, 0, 0, 0.3)"
//             : "0 4px 12px rgba(0, 0, 0, 0.1)",
//           marginBottom: "16px",
//           ":hover": {
//             boxShadow: darkMode
//               ? "0 6px 16px rgba(0, 0, 0, 0.4)"
//               : "0 6px 16px rgba(0, 0, 0, 0.15)",
//           },
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Stack flexDirection={"row"} gap={3} width={"90%"}>
//           <PostOne e={e} />
//           <PostTwo e={e} />
//         </Stack>
//         <Stack
//           flexDirection={"row"}
//           justifyContent={"center"}
//           alignItems={"flex-start"}
//           gap={1}
//         >
//           <Typography
//             variant="caption"
//             color={darkMode ? "#b0b0b0" : "#666"}
//             fontSize={"0.8rem"}
//             sx={{
//               paddingTop: "4px",
//             }}
//           >
//             {/* 4hr */}
//             <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
//               <Typography
//                 variant="caption"
//                 color={darkMode ? "#b0b0b0" : "#666"}
//                 // fontSize={"0.9rem"}
//                 sx={{
//                   fontSize: _300 ? "1rem" : "0.9rem",
//                   fontWeight: 500,
//                 }}
//               >
//                 <PostTime createdAt={e?.createdAt} className="text-[0.8rem]" />
//               </Typography>
//             </Stack>
//           </Typography>
//           {isAdmin ? (
//             <motion.div whileHover={{ scale: 1.1 }}>
//               <IoIosMore
//                 size={24}
//                 onClick={handleOpenMenu}
//                 color={darkMode ? "#b0b0b0" : "#666"}
//               />
//             </motion.div>
//           ) : (
//             <IoIosMore size={24} color={darkMode ? "#b0b0b0" : "#666"} />
//           )}
//         </Stack>
//       </Stack>
//     </motion.div>
//   );
// };

// export default HomePost;


import { Stack, Typography, useMediaQuery } from "@mui/material";
import { IoIosMore } from "react-icons/io";
import PostOne from "./post/PostOne";
import PostTwo from "./post/PostTwo";
import { useDispatch, useSelector } from "react-redux";
import { addPostId, toggleMyMenu } from "../../redux/slice";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostTime from "./post/PostTime";

const HomePost = ({ e }) => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");
  const [isAdmin, setIsAdmin] = useState();

  const { darkMode, myInfo } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    dispatch(addPostId(e._id));
    dispatch(toggleMyMenu(event.currentTarget));
  };

  const checkIsAdmin = () => {
    if (e?.admin._id === myInfo._id) {
      setIsAdmin(true);
      return;
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    if (e && myInfo) {
      checkIsAdmin();
    }
  }, [e, myInfo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        p={3}
        mx={"auto"}
        width={_650 ? "600px" : "95%"}
        sx={{
          background: darkMode
            ? "linear-gradient(to bottom, #1e1e1e, #121212)"
            : "linear-gradient(to bottom, #ffffff, #f5f5f5)",
          borderRadius: "16px",
          boxShadow: darkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
          marginBottom: "16px",
          border: darkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          ":hover": {
            boxShadow: darkMode
              ? "0 12px 40px rgba(0, 0, 0, 0.4)"
              : "0 12px 40px rgba(0, 0, 0, 0.15)",
          },
          transition: "all 0.3s ease",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode
              ? "radial-gradient(circle at 80% 20%, rgba(106, 27, 154, 0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 80% 20%, rgba(106, 27, 154, 0.05) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Stack flexDirection={"row"} gap={3} width={"90%"} position="relative" zIndex={1}>
          <PostOne e={e} />
          <PostTwo e={e} />
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          gap={1}
          position="relative"
          zIndex={1}
        >
          <Typography
            variant="caption"
            color={darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
            fontSize={"0.8rem"}
            sx={{
              paddingTop: "4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <PostTime createdAt={e?.createdAt} />
          </Typography>
          {isAdmin ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IoIosMore
                size={24}
                onClick={handleOpenMenu}
                color={darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
              />
            </motion.div>
          ) : (
            <IoIosMore size={24} color={darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"} />
          )}
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default HomePost;