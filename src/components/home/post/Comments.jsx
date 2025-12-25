// import {
//   Avatar,
//   Menu,
//   MenuItem,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { IoIosMore } from "react-icons/io";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   useDeleteCommentMutation,
//   useSinglePostQuery,
// } from "../../../redux/service";
// import { motion } from "framer-motion";

// const Comments = ({ e, postId }) => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const { darkMode, myInfo } = useSelector((state) => state.service);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const [deleteComment] = useDeleteCommentMutation();
//   const { refetch } = useSinglePostQuery(postId);

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDeleteComment = async () => {
//     const info = {
//       postId,
//       id: e?._id,
//     };
//     await deleteComment(info);
//     handleClose();
//     refetch();
//   };

//   const checkIsAdmin = () => {
//     if (e && myInfo) {
//       setIsAdmin(e.admin._id === myInfo._id);
//     }
//   };

//   useEffect(() => {
//     checkIsAdmin();
//   }, [e, myInfo]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Stack
//         flexDirection={"row"}
//         justifyContent={"space-between"}
//         alignItems={"flex-start"}
//         p={2}
//         mx={"auto"}
//         width={"100%"}
//         sx={{
//           backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
//           borderRadius: "12px",
//           marginBottom: "12px",
//           ":hover": {
//             backgroundColor: darkMode ? "#252525" : "#f0f0f0",
//           },
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Stack flexDirection={"row"} gap={2} width={"85%"}>
//           <Avatar
//             src={e?.admin.profilePic}
//             alt={e?.admin.userName}
//             sx={{
//               width: 40,
//               height: 40,
//               border: `2px solid ${darkMode ? "#333" : "#e0e0e0"}`,
//             }}
//           />
//           <Stack flexDirection={"column"} gap={0.5}>
//             <Typography
//               variant="subtitle1"
//               fontWeight={"bold"}
//               color={darkMode ? "white" : "#1a1a1a"}
//             >
//               {e?.admin.userName}
//             </Typography>
//             <Typography
//               variant="body2"
//               color={darkMode ? "#e0e0e0" : "#333"}
//               sx={{
//                 wordBreak: "break-word",
//               }}
//             >
//               {e?.text}
//             </Typography>
//           </Stack>
//         </Stack>

//         <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
//           <Typography
//             variant="caption"
//             color={darkMode ? "#b0b0b0" : "#666"}
//             fontSize={"0.8rem"}
//           >
//             24min
//           </Typography>
//           {isAdmin && (
//             <motion.div whileHover={{ scale: 1.1 }}>
//               <IoIosMore
//                 size={22}
//                 cursor={"pointer"}
//                 color={darkMode ? "#b0b0b0" : "#666"}
//                 onClick={(event) => setAnchorEl(event.currentTarget)}
//               />
//             </motion.div>
//           )}
//         </Stack>
//       </Stack>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         PaperProps={{
//           sx: {
//             backgroundColor: darkMode ? "#333" : "white",
//             color: darkMode ? "white" : "#333",
//             borderRadius: "8px",
//             boxShadow: darkMode
//               ? "0 4px 12px rgba(0, 0, 0, 0.4)"
//               : "0 4px 12px rgba(0, 0, 0, 0.1)",
//           },
//         }}
//       >
//         <MenuItem
//           onClick={handleDeleteComment}
//           sx={{
//             ":hover": {
//               backgroundColor: darkMode ? "#444" : "#f5f5f5",
//             },
//           }}
//         >
//           <Typography color={darkMode ? "white" : "error"}>Delete</Typography>
//         </MenuItem>
//       </Menu>
//     </motion.div>
//   );
// };

// export default Comments;


import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IoIosMore } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteCommentMutation,
  useSinglePostQuery,
} from "../../../redux/service";
import { motion } from "framer-motion";

const Comments = ({ e, postId }) => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const { darkMode, myInfo } = useSelector((state) => state.service);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();
  const { refetch } = useSinglePostQuery(postId);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = async () => {
    const info = {
      postId,
      id: e?._id,
    };
    await deleteComment(info);
    handleClose();
    refetch();
  };

  const checkIsAdmin = () => {
    if (e && myInfo) {
      setIsAdmin(e.admin._id === myInfo._id);
    }
  };

  useEffect(() => {
    checkIsAdmin();
  }, [e, myInfo]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        p={2}
        mx={"auto"}
        width={"100%"}
        sx={{
          background: darkMode
            ? "linear-gradient(to right, rgba(30,30,30,0.8), rgba(40,40,40,0.8))"
            : "linear-gradient(to right, rgba(255,255,255,0.8), rgba(245,245,245,0.8))",
          borderRadius: "12px",
          marginBottom: "12px",
          boxShadow: darkMode
            ? "0 4px 12px rgba(0, 0, 0, 0.2)"
            : "0 4px 12px rgba(0, 0, 0, 0.05)",
          border: darkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          ":hover": {
            boxShadow: darkMode
              ? "0 6px 16px rgba(0, 0, 0, 0.3)"
              : "0 6px 16px rgba(0, 0, 0, 0.1)",
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
              ? "radial-gradient(circle at 10% 50%, rgba(106, 27, 154, 0.1) 0%, transparent 50%)"
              : "radial-gradient(circle at 10% 50%, rgba(106, 27, 154, 0.05) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Stack flexDirection={"row"} gap={2} width={"85%"} position="relative" zIndex={1}>
          <Avatar
            src={e?.admin.profilePic}
            alt={e?.admin.userName}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #6a1b9a",
            }}
          />
          <Stack flexDirection={"column"} gap={0.5}>
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              color={darkMode ? "white" : "#1a1a1a"}
            >
              {e?.admin.userName}
            </Typography>
            <Typography
              variant="body2"
              color={darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {e?.text}
            </Typography>
          </Stack>
        </Stack>

        <Stack flexDirection={"row"} alignItems={"center"} gap={1} position="relative" zIndex={1}>
          <Typography
            variant="caption"
            color={darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"}
            fontSize={"0.8rem"}
          >
            24min
          </Typography>
          {isAdmin && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IoIosMore
                size={22}
                cursor={"pointer"}
                color={darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"}
                onClick={(event) => setAnchorEl(event.currentTarget)}
              />
            </motion.div>
          )}
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            background: darkMode
              ? "linear-gradient(to bottom, #333, #222)"
              : "linear-gradient(to bottom, #fff, #f5f5f5)",
            color: darkMode ? "white" : "#333",
            borderRadius: "8px",
            boxShadow: darkMode
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 8px 32px rgba(0, 0, 0, 0.15)",
            border: darkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: darkMode
                ? "radial-gradient(circle at 80% 20%, rgba(106, 27, 154, 0.2) 0%, transparent 50%)"
                : "radial-gradient(circle at 80% 20%, rgba(106, 27, 154, 0.1) 0%, transparent 50%)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
          onClick={handleDeleteComment}
          sx={{
            position: "relative",
            zIndex: 1,
            ":hover": {
              background: darkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          <Typography color={darkMode ? "white" : "error"}>Delete</Typography>
        </MenuItem>
      </Menu>
    </motion.div>
  );
};

export default Comments;