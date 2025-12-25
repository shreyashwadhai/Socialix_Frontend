// import {
//   Avatar,
//   Button,
//   Chip,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { FaInstagram } from "react-icons/fa";
// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { editProfileModel } from "../../../../redux/slice";
// import {
//   useFollowUserMutation,
//   useUserDetailsQuery,
// } from "../../../../redux/service";
// import EditProfile from "../../../models/EditProfile";

// const ProfileLayout = () => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   const params = useParams();
//   const dispatch = useDispatch();
//   const [myAccount, setMyAccount] = useState();
//   const [isFollowing, setIsFollowing] = useState();

//   const { data } = useUserDetailsQuery(params?.id);
//   console.log("User Details Data: ", data);

//   const [followUser, followUserData] = useFollowUserMutation();
//   const { darkMode, myInfo } = useSelector((state) => state.service);

//   const checkIsFollowing = () => {
//     if (data && myInfo) {
//       const isTrue = data.user.followers.filter((e) => e._id === myInfo._id);
//       if (isTrue.length > 0) {
//         setIsFollowing(true);
//         return;
//       }
//       setIsFollowing(false);
//     }
//   };

//   const checkIsMyAccount = () => {
//     if (data && myInfo) {
//       const isTrue = data.user._id === myInfo._id;
//       setMyAccount(isTrue);
//     }
//   };

//   const handleFollow = async () => {
//     if (data) {
//       await followUser(data.user._id);
//     }
//   };

//   const handleOpenEditModel = () => {
//     dispatch(editProfileModel(true));
//   };

//   useEffect(() => {
//     if (followUserData.isSuccess) console.log(followUserData.data);
//     if (followUserData.isError) console.log(followUserData.error.data);
//   }, [followUserData.isSuccess, followUserData.isError]);

//   useEffect(() => {
//     checkIsFollowing();
//     checkIsMyAccount();
//   }, [data]);

//   return (
//     <>
//       <Stack
//         flexDirection={"column"}
//         gap={2}
//         p={2}
//         m={2}
//         width={_650 ? "800px" : "90%"}
//         mx={"auto"}
//       >
//         <Stack
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//         >
//           <Stack flexDirection={"column"} gap={1}>
//             <Typography
//               variant="h2"
//               fontWeight={"bold"}
//               fontSize={_400 ? "2rem" : _300 ? "1rem" : "0.8rem"}
//               color={darkMode ? "white" : "black"}
//             >
//               {data ? (data.user ? data.user.userName : "") : ""}
//             </Typography>
//             <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
//               <Typography
//                 variant="h2"
//                 fontSize={"1rem"}
//                 color={darkMode ? "white" : "black"}
//               >
//                 {data ? (data.user ? data.user.email : "") : ""}
//               </Typography>
//               <Chip
//                 label={"socialix.net"}
//                 size="small"
//                 sx={{
//                   fontSize: "0.7rem",
//                   ":hover": {
//                     cursor: "pointer",
//                     // fontWeight:"bold"
//                   },
//                 }}
//               />
//             </Stack>
//           </Stack>
//           <Avatar
//             src={data ? (data.user ? data.user.profilePic : "") : ""}
//             alt={data ? (data.user ? data.user.userName : "") : ""}
//             sx={{
//               width: 60,
//               height: 60,
//               ":hover": {
//                 cursor: "pointer",
//               },
//             }}
//           />
//         </Stack>
//         <Typography variant="subtitle2" color={darkMode ? "white" : "black"}>
//           {data ? (data.user ? data.user.bio : "") : ""}
//         </Typography>
//         <Stack
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//         >
//           <Typography variant="subtitle2" color={darkMode ? "white" : "gray"}>
//             {data
//               ? data.user
//                 ? data.user.followers.length > 0
//                   ? `${data.user.followers.length} followers`
//                   : "No Followers"
//                 : ""
//               : ""}
//           </Typography>
//           <FaInstagram
//             size={30}
//             cursor={"pointer"}
//             color={darkMode ? "white" : "black"}
//           />
//         </Stack>
//       </Stack>
//       <Button
//         size="large"
//         sx={{
//           color: darkMode ? "whitesmoke" : "black",
//           width: "800px",
//           maxWidth: "90%",
//           mx: "auto",
//           textAlign: "center",
//           border: "1px solid",
//           borderColor: darkMode ? "white" : "black",
//           borderRadius: "10px",
//           ":hover": {
//             cursor: "pointer",
//             bgcolor: darkMode ? "white" : "black",
//             color: darkMode ? "black" : "white",
//           },
//           transition: "all ease 0.3s",
//         }}
//         className=""
//         onClick={myAccount ? handleOpenEditModel : handleFollow}
//       >
//         {myAccount ? "Edit Profile" : isFollowing ? "Unfollow" : "Follow user"}
//       </Button>
//       <Stack
//         flexDirection={"row"}
//         justifyContent={"space-evenly"}
//         maxWidth={"90%"}
//         my={5}
//         // pb={"0rem"}
//         borderBottom={"2px solid gray"}
//         fontSize={"1.2rem"}
//         width={"800px"}
//         mx={"auto"}
//         color={darkMode ? "white" : "black"}
//       >
//         <Link
//           to={`/profile/posts/${data?.user._id}`}
//           className={`w-28 text-center pb-2 border-b-2 hover:border-black `}
//         >
//           Posts
//         </Link>
//         <Link
//           to={`/profile/replies/${data?.user._id}`}
//           className=" w-28 text-center pb-2 border-b-2 hover:border-black"
//         >
//           Replies
//         </Link>
//         <Link
//           to={`/profile/reposts/${data?.user._id}`}
//           className=" w-28 text-center pb-2 border-b-2 hover:border-black"
//         >
//           Reposts
//         </Link>
//       </Stack>
//       <Outlet />
//       <EditProfile />
//     </>
//   );
// };

// export default ProfileLayout;
// ---------------------------
// import {
//   Avatar,
//   Button,
//   Chip,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { FaInstagram } from "react-icons/fa";
// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { editProfileModel } from "../../../../redux/slice";
// import {
//   useFollowUserMutation,
//   useUserDetailsQuery,
// } from "../../../../redux/service";
// import EditProfile from "../../../models/EditProfile";

// const ProfileLayout = () => {
//   const _300 = useMediaQuery("(min-width:300px)");
//   const _400 = useMediaQuery("(min-width:400px)");
//   const _650 = useMediaQuery("(min-width:650px)");

//   // const { id: paramId } = useParams();

//   const paramId = useParams().id;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { darkMode, myInfo } = useSelector((state) => state.service);

//   // Determine which user ID to fetch (own or others)
//   const userId = paramId ?? myInfo?.me?._id;

//   const { data, refetch } = useUserDetailsQuery(userId, { skip: !userId });

//   const [followUser, followUserData] = useFollowUserMutation();

//   const [myAccount, setMyAccount] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);

//   const checkIsFollowing = () => {
//     if (data?.user && myInfo) {
//       const isTrue = data.user.followers.some((e) => e._id === myInfo._id);
//       setIsFollowing(isTrue);
//     }
//   };

//   const checkIsMyAccount = () => {
//     if (data?.user && myInfo) {
//       setMyAccount(data.user._id === myInfo._id);
//     }
//   };

//   const handleFollow = async () => {
//     if (data?.user) {
//       await followUser(data.user._id);
//     }
//   };

//   const handleOpenEditModel = () => {
//     dispatch(editProfileModel(true));
//   };
//   useEffect(() => {
//     if (userId) refetch();
//   }, [userId]);

//   useEffect(() => {
//     if (followUserData.isSuccess) console.log(followUserData.data);
//     if (followUserData.isError) console.log(followUserData.error?.data);
//   }, [followUserData.isSuccess, followUserData.isError]);

//   useEffect(() => {
//     checkIsFollowing();
//     checkIsMyAccount();
//   }, [data, myInfo]);

//   // if (!userId) {
//   //   // If userId is still missing, redirect to home
//   //   navigate("/");
//   //   return null;
//   // }

//   if (!userId) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Stack
//         flexDirection={"column"}
//         gap={2}
//         p={2}
//         m={2}
//         width={_650 ? "800px" : "90%"}
//         mx={"auto"}
//       >
//         <Stack
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//         >
//           <Stack flexDirection={"column"} gap={1}>
//             <Typography
//               variant="h2"
//               fontWeight={"bold"}
//               fontSize={_400 ? "2rem" : _300 ? "1rem" : "0.8rem"}
//               color={darkMode ? "white" : "black"}
//             >
//               {data?.user?.userName || ""}
//             </Typography>
//             <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
//               <Typography
//                 variant="h2"
//                 fontSize={"1rem"}
//                 color={darkMode ? "white" : "black"}
//               >
//                 {data?.user?.email || ""}
//               </Typography>
//               <Chip
//                 label={"socialix.net"}
//                 size="small"
//                 sx={{
//                   fontSize: "0.7rem",
//                   ":hover": {
//                     cursor: "pointer",
//                   },
//                 }}
//               />
//             </Stack>
//           </Stack>
//           <Avatar
//             src={data?.user?.profilePic || ""}
//             alt={data?.user?.userName || ""}
//             sx={{
//               width: 60,
//               height: 60,
//               ":hover": {
//                 cursor: "pointer",
//               },
//             }}
//           />
//         </Stack>
//         <Typography variant="subtitle2" color={darkMode ? "white" : "black"}>
//           {data?.user?.bio || ""}
//         </Typography>
//         <Stack
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//         >
//           <Typography variant="subtitle2" color={darkMode ? "white" : "gray"}>
//             {data?.user
//               ? data.user.followers.length > 0
//                 ? `${data.user.followers.length} followers`
//                 : "No Followers"
//               : ""}
//           </Typography>
//           <FaInstagram
//             size={30}
//             cursor={"pointer"}
//             color={darkMode ? "white" : "black"}
//           />
//         </Stack>
//       </Stack>
//       <Button
//         size="large"
//         sx={{
//           color: darkMode ? "whitesmoke" : "black",
//           width: "800px",
//           maxWidth: "90%",
//           mx: "auto",
//           textAlign: "center",
//           border: "1px solid",
//           borderColor: darkMode ? "white" : "black",
//           borderRadius: "10px",
//           ":hover": {
//             cursor: "pointer",
//             bgcolor: darkMode ? "white" : "black",
//             color: darkMode ? "black" : "white",
//           },
//           transition: "all ease 0.3s",
//         }}
//         onClick={myAccount ? handleOpenEditModel : handleFollow}
//       >
//         {myAccount ? "Edit Profile" : isFollowing ? "Unfollow" : "Follow user"}
//       </Button>
//       <Stack
//         flexDirection={"row"}
//         justifyContent={"space-evenly"}
//         maxWidth={"90%"}
//         my={5}
//         borderBottom={"2px solid gray"}
//         fontSize={"1.2rem"}
//         width={"800px"}
//         mx={"auto"}
//         color={darkMode ? "white" : "black"}
//       >
//         <Link
//           to={`/profile/${userId}/posts`}
//           className={`w-28 text-center pb-2 border-b-2 hover:border-black`}
//         >
//           Posts
//         </Link>
//         <Link
//           to={`/profile/${userId}/replies`}
//           className="w-28 text-center pb-2 border-b-2 hover:border-black"
//         >
//           Replies
//         </Link>
//         <Link
//           to={`/profile/${userId}/reposts`}
//           className="w-28 text-center pb-2 border-b-2 hover:border-black"
//         >
//           Reposts
//         </Link>
//       </Stack>
//       <Outlet />
//       <EditProfile />
//     </>
//   );
// };

// export default ProfileLayout;

// ---------------------------

import {
  Avatar,
  Button,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FaInstagram, FaLink } from "react-icons/fa";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel } from "../../../../redux/slice";
import {
  useFollowUserMutation,
  useUserDetailsQuery,
} from "../../../../redux/service";
import EditProfile from "../../../models/EditProfile";
import Loading from "../../../common/Loading";

const ProfileLayout = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const paramId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { darkMode, myInfo } = useSelector((state) => state.service);
  const userId = paramId ?? myInfo?.me?._id;

  const { data, refetch } = useUserDetailsQuery(userId, { skip: !userId });
  const [followUser, followUserData] = useFollowUserMutation();

  const [myAccount, setMyAccount] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const checkIsFollowing = () => {
    if (data?.user && myInfo) {
      const isTrue = data.user.followers.some((e) => e._id === myInfo._id);
      setIsFollowing(isTrue);
    }
  };

  const checkIsMyAccount = () => {
    if (data?.user && myInfo) {
      setMyAccount(data.user._id === myInfo._id);
    }
  };

  const handleFollow = async () => {
    if (data?.user) {
      await followUser(data.user._id);
    }
  };

  const handleOpenEditModel = () => {
    dispatch(editProfileModel(true));
  };

  useEffect(() => {
    if (userId) refetch();
  }, [userId]);

  useEffect(() => {
    if (followUserData.isSuccess) console.log(followUserData.data);
    if (followUserData.isError) console.log(followUserData.error?.data);
  }, [followUserData.isSuccess, followUserData.isError]);

  useEffect(() => {
    checkIsFollowing();
    checkIsMyAccount();
  }, [data, myInfo]);

  if (!userId) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <Loading />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Stack
        flexDirection={"column"}
        gap={3}
        p={3}
        width={_650 ? "800px" : "90%"}
        mx={"auto"}
        sx={{
          backgroundColor: darkMode ? "#121212" : "#f5f5f5",
          borderRadius: "16px",
          boxShadow: darkMode
            ? "0 4px 20px rgba(255, 255, 255, 0.1)"
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack flexDirection={"column"} gap={1.5}>
            <Typography
              variant="h2"
              fontWeight={"bold"}
              fontSize={_400 ? "2rem" : _300 ? "1.5rem" : "1.2rem"}
              color={darkMode ? "white" : "#1a1a1a"}
            >
              {data?.user?.userName || ""}
            </Typography>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
              <Typography
                variant="h2"
                fontSize={"0.9rem"}
                color={darkMode ? "#b0b0b0" : "#666"}
              >
                {data?.user?.email || ""}
              </Typography>
              <Chip
                icon={<FaLink size={12} />}
                label={"socialix.net"}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  backgroundColor: darkMode ? "#333" : "#e0e0e0",
                  color: darkMode ? "white" : "#333",
                  ":hover": {
                    cursor: "pointer",
                    backgroundColor: darkMode ? "#444" : "#d0d0d0",
                  },
                }}
                // onClick={() => window.open("https://socialix.net", "_blank")}
              />
            </Stack>
          </Stack>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Avatar
              src={data?.user?.profilePic || ""}
              alt={data?.user?.userName || ""}
              sx={{
                width: 80,
                height: 80,
                border: `3px solid ${darkMode ? "#444" : "#ddd"}`,
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
          </motion.div>
        </Stack>

        {data?.user?.bio && (
          <Typography
            variant="subtitle2"
            color={darkMode ? "#e0e0e0" : "#555"}
            sx={{
              padding: "8px 12px",
              backgroundColor: darkMode ? "#1e1e1e" : "#f0f0f0",
              borderRadius: "8px",
            }}
          >
            {data?.user?.bio}
          </Typography>
        )}

        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            padding: "12px",
            backgroundColor: darkMode ? "#1e1e1e" : "#f0f0f0",
            borderRadius: "12px",
          }}
        >
          <Typography variant="subtitle2" color={darkMode ? "#b0b0b0" : "#666"}>
            {/* {data?.user
              ? `${data.user.followers?.length} ${data.user.followers?.length !== 1 ? "followers" : "follower"} • ${data.user.following?.length ? "" : 0} following`
              : ""} */}
            {data?.user
              ? data.user.followers.length > 0
                ? `${data.user.followers.length} followers`
                : "No Followers"
              : ""}
          </Typography>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
            <FaInstagram
              size={28}
              cursor={"pointer"}
              color={darkMode ? "#bb86fc" : "#6a1b9a"}
            />
          </motion.div>
        </Stack>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: myAccount
                ? darkMode
                  ? "#bb86fc"
                  : "#6a1b9a"
                : isFollowing
                  ? darkMode
                    ? "#333"
                    : "#e0e0e0"
                  : darkMode
                    ? "#03dac6"
                    : "#00897b",
              color:
                myAccount || !isFollowing
                  ? "white"
                  : darkMode
                    ? "white"
                    : "#333",
              width: "100%",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              ":hover": {
                backgroundColor: myAccount
                  ? darkMode
                    ? "#9a67ea"
                    : "#5d1a8a"
                  : isFollowing
                    ? darkMode
                      ? "#444"
                      : "#d0d0d0"
                    : darkMode
                      ? "#00c9b7"
                      : "#00796b",
              },
              transition: "all 0.3s ease",
            }}
            onClick={myAccount ? handleOpenEditModel : handleFollow}
          >
            {myAccount
              ? "Edit Profile"
              : isFollowing
                ? "Unfollow"
                : "Follow User"}
          </Button>
        </motion.div>

        <Stack
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          my={3}
          width={"100%"}
          mx={"auto"}
        >
          {["posts", "replies", "reposts"].map((tab) => (
            <motion.div
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={`/profile/${tab}/${userId}`}
                style={{
                  textDecoration: "none",
                  width: "100px",
                  textAlign: "center",
                  padding: "12px 0",
                  position: "relative",
                }}
              >
                <Typography
                  variant="button"
                  color={darkMode ? "white" : "#333"}
                  fontWeight="medium"
                  sx={{
                    "&:hover": {
                      color: darkMode ? "#bb86fc" : "#6a1b9a",
                    },
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Typography>
                {window.location.pathname.includes(tab) && (
                  <motion.div
                    layoutId="underline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      backgroundColor: darkMode ? "#bb86fc" : "#6a1b9a",
                      borderRadius: "3px",
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </Stack>

        <Outlet />
        <EditProfile />
      </Stack>
    </motion.div>
  );
};

export default ProfileLayout;
