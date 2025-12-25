// import {
//   Avatar,
//   Button,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import React from "react";

// import { useSelector } from "react-redux";
// const SearchProfileBar = ({ e }) => {
//   console.log(e);

//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const { darkMode } = useSelector((state) => state.service);

//   return (
//     <>
//       <Stack
//         flexDirection={"row"}
//         justifyContent={"space-between"}
//         px={1}
//         py={1}
//         mx={"auto"}
//         boxShadow={"5px 5px 5px gray"}
//         width={_400 ? "90%" : "100%"}
//         borderRadius={"15px"}
//         sx={{
//           ":hover": { cursor: "pointer", boxShadow: "10px 10px 10px gray" },
//           transition: "all ease-in-out 0.3s",
//         }}
//       >
//         <Stack flexDirection={"row"} gap={2}>
//           <Avatar src={e ? e.profilePic : ""} alt={e ? e.userName : ""} />
//           <Stack flexDirection={"column"}>
//             <Link to={`/profile/posts/${e._id}`} className="link">
//               <Typography
//                 variant="h6"
//                 fontWeight={"bold"}
//                 fontSize={_650 ? "1rem" : "0.9rem"}
//                 color={darkMode ? "white" : "black"}
//               >
//                 {e ? e.userName : ""}
//               </Typography>
//             </Link>
//             <Typography
//               variant="caption"
//               fontSize={_650 ? "1rem" : "0.75rem"}
//               color={darkMode ? "white" : "gray"}
//             >
//               {e ? e.bio : ""}
//             </Typography>
//             <Typography
//               variant="caption"
//               fontSize={_650 ? "1rem" : "0.9rem"}
//               color={darkMode ? "white" : "black"}
//             >
//               {e ? e.followers.length : 0} followers
//             </Typography>
//           </Stack>
//         </Stack>
//         <Link to={`/profile/posts/${e._id}`} className="link">
//           <Button
//             size="medium"
//             sx={{
//               border: "1px solid gray",
//               color: darkMode ? "whitesmoke" : "black",
//               borderRadius: "10px",
//               p: 2,
//               zIndex: 1,
//               bgcolor: darkMode ? "gray" : "white-smoke",
//               height: _650 ? 40 : 35,
//               my: 2,
//               alignItems: "center",
//               ":hover": {
//                 bgcolor: "black",
//                 color: "white",
//               },
//             }}
//           >
//             Follow
//           </Button>
//         </Link>
//       </Stack>
//     </>
//   );
// };

// export default SearchProfileBar;


import { Avatar, Button, Stack, Typography, useMediaQuery, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const SearchProfileBar = ({ e }) => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");
  const { darkMode } = useSelector((state) => state.service);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          p: 2,
          mx: 'auto',
          my: 1,
          width: '95%',
          maxWidth: 600,
          borderRadius: '12px',
          background: darkMode 
            ? 'linear-gradient(to right, rgba(30,30,30,0.8), rgba(40,40,40,0.8))' 
            : 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(245,245,245,0.8))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: darkMode 
            ? '1px solid rgba(255,255,255,0.1)' 
            : '1px solid rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          ':hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)'
          }
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar 
              src={e?.profilePic} 
              alt={e?.userName}
              sx={{ 
                width: 56, 
                height: 56,
                border: '2px solid #6a1b9a'
              }}
            />
            <Stack>
              <Link to={`/profile/posts/${e._id}`} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color={darkMode ? 'white' : 'black'}
                >
                  {e?.userName}
                </Typography>
              </Link>
              <Typography
                variant="body2"
                color={darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'}
              >
                {e?.bio}
              </Typography>
              <Typography
                variant="caption"
                color={darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              >
                {e?.followers?.length || 0} followers
              </Typography>
            </Stack>
          </Stack>
          
          <Link to={`/profile/posts/${e._id}`} style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: '20px',
                  borderColor: '#6a1b9a',
                  color: '#6a1b9a',
                  px: 3,
                  ':hover': {
                    backgroundColor: 'rgba(106,27,154,0.1)',
                    borderColor: '#6a1b9a'
                  }
                }}
              >
                Follow
              </Button>
            </motion.div>
          </Link>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default SearchProfileBar;