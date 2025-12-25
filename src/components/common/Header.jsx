// import { Link } from "react-router-dom";

// import { Grid, Stack, useMediaQuery } from "@mui/material";
// import Navbar from "./Navbar";

// // Icons
// import { BiMenuAltRight } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleMainMenu } from "../../redux/slice";
// import AppLogo from "../../assets/app_logo.png";

// const Header = () => {
//   const _400 = useMediaQuery("(min-width:400px)");

//   const { darkMode } = useSelector((state) => state.service);
//   const dispatch = useDispatch();

//   const handleOpenMenu = (e) => {
//     // console.log(e.currentTarget);

//     dispatch(toggleMainMenu(e.currentTarget));
//   };

//   return (
//     <>
//       {_400 ? (
//         <Stack
//           flexDirection={"row"}
//           height={52}
//           justifyContent={"space-around"}
//           alignItems={"center"}
//           py={1}
//           position={"sticky"}
//           top={0}
//         >
//           <Link to={"/"}>
//             {darkMode ? (
//               <img
//                 src={AppLogo}
//                 alt="logo"
//                 width={100}
//                 // height={32}
//               />
//             ) : (
//               <img
//                 src={AppLogo}
//                 alt="logo"
//                 width={100}
//                 // height={32}
//               />
//             )}
//           </Link>
//           <Stack
//             justifyContent={"center"}
//             width={"550px"}
//             bgcolor={darkMode ? "black" : "aliceblue"}
//             //   color={"black"}
//             zIndex={2}
//             height={80}
//           >
//             <Navbar />
//           </Stack>
//           <BiMenuAltRight
//             size={36}
//             cursor={"pointer"}
//             color="GrayText"
//             onClick={handleOpenMenu}
//           />
//         </Stack>
//       ) : (
//         <>
//           <Stack
//             position={"fixed"}
//             bottom={0}
//             justifyContent={"center"}
//             width={"100%"}
//             height={52}
//             // p={1}

//             bgcolor={darkMode ? "black" : "aliceblue"}
//             zIndex={2}
//           >
//             <Navbar />
//           </Stack>
//           <Grid
//             container
//             height={60}
//             justifyContent={"flex-end"}
//             alignItems={"center"}
//             p={1}
//           >
//             <Grid item xs={6}>
//               <Link to={"/"}>
//                 <img
//                   src={AppLogo}
//                   alt="logo"
//                   width={70}
//                   height={35}
//                 />
//               </Link>
//             </Grid>
//             <BiMenuAltRight
//               size={36}
//               cursor={"pointer"}
//               color="GrayText"
//               onClick={handleOpenMenu}
//             />
//           </Grid>
//         </>
//       )}
//     </>
//   );
// };

// export default Header;


import { Link } from "react-router-dom";
import { Grid, Stack, useMediaQuery, Box } from "@mui/material";
import { motion } from "framer-motion";
import { BiMenuAltRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../redux/slice";
import AppLogo from "../../assets/app_logo.png";
import Navbar from "./Navbar";

const Header = () => {
  const _400 = useMediaQuery("(min-width:400px)");
  const { darkMode } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  const handleOpenMenu = (e) => dispatch(toggleMainMenu(e.currentTarget));

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          backdropFilter: 'blur(10px)',
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          py: 1
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          maxWidth="lg"
          mx="auto"
          px={2}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/">
              <img 
                src={AppLogo} 
                alt="logo" 
                width={_400 ? 120 : 90} 
                style={{ filter: darkMode ? 'invert(1)' : 'none' }}
              />
            </Link>
          </motion.div>

          {_400 && (
            <Box sx={{ flex: 1, maxWidth: 600, mx: 3 }}>
              <Navbar />
            </Box>
          )}

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <BiMenuAltRight 
              size={_400 ? 32 : 28} 
              color={darkMode ? 'white' : 'black'} 
              onClick={handleOpenMenu}
              style={{ cursor: 'pointer' }}
            />
          </motion.div>
        </Stack>
      </Box>
    </>
  );
};

export default Header;