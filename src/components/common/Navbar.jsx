import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, useMediaQuery } from "@mui/material";

// Icons
import { IoHome } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../redux/slice";

const Navbar = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const { darkMode, myInfo } = useSelector((state) => state.service);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showArrow, setShowArrow] = useState(false);

  const checkArrow = () => {
    if (window.location.pathname.startsWith("/post/") && _650) {
      setShowArrow(true);
      return;
    }
    setShowArrow(false);
  };

  const handleAddPost = () => {
    dispatch(addPostModel(true));
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    checkArrow();
  }, [window.location.pathname]);

  return (
    <>
<Stack
  flexDirection={"row"}
  maxWidth={"100%"}
  justifyContent={"space-around"}
  height={52}
  alignItems={"center"}
>
  {showArrow ? (
    <FaArrowLeft
      size={_400 ? 28 : 24}
      className="link"
      color={darkMode ? "white" : "black"}
      onClick={handleNavigate}
    />
  ) : null}
  <Link to={"/"} className="link">
    <IoHome
      size={_400 ? 32 : 24}
      cursor={"pointer"}
      color={darkMode ? "white" : "black"}
    />
  </Link>
  <Link to={"/search"}>
    <IoSearchSharp
      size={_400 ? 28 : 24}
      cursor={"pointer"}
      color={darkMode ? "white" : "black"}
    />
  </Link>

  <Link>
    <FaEdit
      size={_400 ? 28 : 24}
      cursor={"pointer"}
      onClick={handleAddPost}
      color={darkMode ? "white" : "black"}
    />
  </Link>
  {/* <Link>
    <IoHeart
      size={_400 ? 28 : 24}
      cursor={"pointer"}
      color={darkMode ? "white" : "black"}
    />
  </Link> */}
  <Link to={"/message"}>
    <MdOutlineMessage
      size={_400 ? 28 : 24}
      cursor={"pointer"}
      color={darkMode ? "white" : "black"}
    />
  </Link>
  <Link to={`/profile/posts/${myInfo._id}`} className="link">
    <RxAvatar
      size={_400 ? 28 : 24}
      cursor={"pointer"}
      color={darkMode ? "white" : "black"}
    />
  </Link>
</Stack>
    </>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Stack, useMediaQuery, Box } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoHome, IoSearchSharp, IoHeart } from "react-icons/io5";
// import { MdOutlineMessage } from "react-icons/md";
// import { FaEdit, FaArrowLeft } from "react-icons/fa";
// import { RxAvatar } from "react-icons/rx";

// import { useDispatch, useSelector } from "react-redux";
// import { addPostModel } from "../../redux/slice";

// const Navbar = () => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const { darkMode, myInfo } = useSelector((state) => state.service);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showArrow, setShowArrow] = useState(false);

//   const checkArrow = () => {
//     if (window.location.pathname.startsWith("/post/") && _650) {
//       setShowArrow(true);
//       return;
//     }
//     setShowArrow(false);
//   };

//   const handleAddPost = () => dispatch(addPostModel(true));
//   const handleNavigate = () => navigate(-1);

//   useEffect(() => checkArrow(), [window.location.pathname]);

//   const navItems = [
//     { icon: <IoHome size={_400 ? 24 : 20} />, path: "/", show: true },
//     {
//       icon: <IoSearchSharp size={_400 ? 24 : 20} />,
//       path: "/search",
//       show: true,
//     },
//     {
//       icon: <FaEdit size={_400 ? 24 : 20} />,
//       action: handleAddPost,
//       show: true,
//     },
//     { icon: <IoHeart size={_400 ? 24 : 20} />, path: "/activity", show: true },
//     {
//       icon: <MdOutlineMessage size={_400 ? 24 : 20} />,
//       path: "/message",
//       show: true,
//     },
//     {
//       icon: <RxAvatar size={_400 ? 24 : 20} />,
//       path: `/profile/posts/${myInfo._id}`,
//       show: true,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//         backdropFilter: "blur(10px)",
//         backgroundColor: darkMode
//           ? "rgba(30, 30, 30, 0.8)"
//           : "rgba(255, 255, 255, 0.8)",
//         borderTop: darkMode
//           ? "1px solid rgba(255, 255, 255, 0.1)"
//           : "1px solid rgba(0, 0, 0, 0.1)",
//         display: _650 ? "block" : "block", 
//       }}
//     >
//       <Stack
//         direction="row"
//         justifyContent="space-around"
//         alignItems="center"
//         height={60}
//         px={2}
//       >
//         {navItems.map((item, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {item.path ? (
//               <Link
//                 to={item.path}
//                 style={{ color: darkMode ? "black" : "black" }}
//               >
//                 {item.icon}
//               </Link>
//             ) : (
//               <Box
//                 onClick={item.action}
//                 sx={{ color: darkMode ? "white" : "black", cursor: "pointer" }}
//               >
//                 {item.icon}
//               </Box>
//             )}
//           </motion.div>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default Navbar;


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Stack, useMediaQuery, Box, styled } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoHome, IoSearchSharp, IoHeart } from "react-icons/io5";
// import { MdOutlineMessage } from "react-icons/md";
// import { FaEdit, FaArrowLeft } from "react-icons/fa";
// import { RxAvatar } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { addPostModel } from "../../redux/slice";

// // Custom styled component for 3D effect
// const NavItem3D = styled(motion.div)(({ theme, darkMode }) => ({
//   position: 'relative',
//   padding: '8px 12px',
//   borderRadius: '16px',
//   background: darkMode 
//     ? 'linear-gradient(145deg, #2a2a2a, #1f1f1f)' 
//     : 'linear-gradient(145deg, #ffffff, #e0e0e0)',
//   boxShadow: darkMode
//     ? '5px 5px 10px #121212, -5px -5px 10px #383838'
//     : '5px 5px 10px #d0d0d0, -5px -5px 10px #ffffff',
//   transformStyle: 'preserve-3d',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-3px)',
//     boxShadow: darkMode
//       ? '8px 8px 15px #121212, -8px -8px 15px #383838'
//       : '8px 8px 15px #d0d0d0, -8px -8px 15px #ffffff'
//   },
//   '&:active': {
//     transform: 'translateY(1px)',
//     boxShadow: darkMode
//       ? '2px 2px 5px #121212, -2px -2px 5px #383838'
//       : '2px 2px 5px #d0d0d0, -2px -2px 5px #ffffff'
//   }
// }));

// const Navbar = () => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const { darkMode, myInfo } = useSelector((state) => state.service);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showArrow, setShowArrow] = useState(false);
//   const [activeTab, setActiveTab] = useState(null);

//   const checkArrow = () => {
//     setShowArrow(window.location.pathname.startsWith("/post/") && _650);
//   };

//   const handleAddPost = () => dispatch(addPostModel(true));
//   const handleNavigate = () => navigate(-1);

//   useEffect(() => {
//     checkArrow();
//     // Set active tab based on current route
//     const path = window.location.pathname;
//     if (path === "/") setActiveTab("home");
//     else if (path === "/search") setActiveTab("search");
//     else if (path === "/activity") setActiveTab("activity");
//     else if (path === "/message") setActiveTab("message");
//     else if (path.includes("/profile")) setActiveTab("profile");
//   }, [window.location.pathname]);

//   const navItems = [
//     { 
//       id: "home",
//       icon: <IoHome size={_400 ? 24 : 20} />, 
//       path: "/", 
//       show: true 
//     },
//     {
//       id: "search",
//       icon: <IoSearchSharp size={_400 ? 24 : 20} />,
//       path: "/search",
//       show: true,
//     },
//     {
//       id: "create",
//       icon: <FaEdit size={_400 ? 24 : 20} />,
//       action: handleAddPost,
//       show: true,
//     },
//     { 
//       id: "activity",
//       icon: <IoHeart size={_400 ? 24 : 20} />, 
//       path: "/activity", 
//       show: true 
//     },
//     {
//       id: "message",
//       icon: <MdOutlineMessage size={_400 ? 24 : 20} />,
//       path: "/message",
//       show: true,
//     },
//     {
//       id: "profile",
//       icon: <RxAvatar size={_400 ? 24 : 20} />,
//       path: `/profile/posts/${myInfo._id}`,
//       show: true,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         bottom: _650 ? "auto" : 0,
//         top: _650 ? 0 : "auto",
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//         backdropFilter: "blur(10px)",
//         backgroundColor: darkMode
//           ? "rgba(30, 30, 30, 0.8)"
//           : "rgba(255, 255, 255, 0.8)",
//         borderTop: _650 ? "none" : darkMode
//           ? "1px solid rgba(255, 255, 255, 0.1)"
//           : "1px solid rgba(0, 0, 0, 0.1)",
//         borderBottom: _650 ? darkMode
//           ? "1px solid rgba(255, 255, 255, 0.1)"
//           : "1px solid rgba(0, 0, 0, 0.1)" : "none",
//         boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Stack
//         direction={_650 ? "column" : "row"}
//         justifyContent="space-around"
//         alignItems="center"
//         height={_650 ? "100vh" : 60}
//         width={_650 ? 80 : "100%"}
//         px={_650 ? 0 : 2}
//         py={_650 ? 2 : 0}
//         spacing={_650 ? 3 : 0}
//       >
//         {showArrow && _650 && (
//           <NavItem3D
//             darkMode={darkMode}
//             onClick={handleNavigate}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             sx={{ mb: 3 }}
//           >
//             <FaArrowLeft size={20} color={darkMode ? "#fff" : "#000"} />
//           </NavItem3D>
//         )}

//         {navItems.map((item) => (
//           <NavItem3D
//             key={item.id}
//             darkMode={darkMode}
//             onClick={item.action}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             sx={{
//               background: activeTab === item.id 
//                 ? darkMode 
//                   ? 'linear-gradient(145deg, #6a1b9a, #9c27b0)'
//                   : 'linear-gradient(145deg, #bb86fc, #9c27b0)'
//                 : '',
//               color: activeTab === item.id ? '#fff' : (darkMode ? '#fff' : '#000')
//             }}
//           >
//             {item.path ? (
//               <Link to={item.path} style={{ color: 'inherit' }}>
//                 {item.icon}
//               </Link>
//             ) : (
//               <Box sx={{ display: 'flex', color: 'inherit' }}>
//                 {item.icon}
//               </Box>
//             )}
//           </NavItem3D>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default Navbar;