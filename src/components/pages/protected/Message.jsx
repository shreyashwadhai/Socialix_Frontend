import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  useMediaQuery,
  TextField,
  InputAdornment,
  Paper,
  Divider,
  Badge,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  MoreVert,
  Chat,
  ArrowBack,
  Send,
  AttachFile,
  Mood,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { MdCall, MdVideoCall } from "react-icons/md";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Message = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [activeChat, setActiveChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [promptId, setPromptId] = useState();
  const [promptUserName, setPromptUserName] = useState();

  const [callStatus, setCallStatus] = useState({
    loading: false,
    error: null,
    success: null,
  });
  const zpRef = useRef();

  // ZegoCloud credentials
  const userID = `user_${Math.floor(Math.random() * 10000)}`;
  const userName = `User_${userID}`;
  const appID = 85089481;
  const serverSecret = "6e7b182cb22d1a8a4a2020dd709c6e85";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  // Initialize ZegoCloud
  useEffect(() => {
    const initializeZego = async () => {
      try {
        // if (!window.ZegoUIKitPrebuilt) {
        //   throw new Error("ZegoCloud SDK not loaded");
        // }

        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        await zp.addPlugins({ ZIM });
        zpRef.current = zp;

        console.log("ZegoCloud initialized successfully");
      } catch (err) {
        console.error("ZegoCloud initialization failed:", err);
        setCallStatus({
          ...callStatus,
          error:
            "Failed to initialize video call service. Please refresh the page.",
        });
      }
    };

    initializeZego();

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, []);

  // Enhanced call invitation function
  const callInvite = async (callType) => {
    setCallStatus({
      loading: true,
      error: null,
      success: null,
    });

    try {
      if (!zpRef.current) {
        throw new Error("Video call service not initialized");
      }

      const targetUserID = prompt("Enter User ID for Call");
      const targetUserName = prompt("Enter User Name for Call");

      if (!targetUserID || !targetUserName) {
        throw new Error("User ID and Name are required");
      }

      setPromptId(targetUserID);
      setPromptUserName();

      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network.");
      }

      const result = await zpRef.current.sendCallInvitation({
        callees: [
          {
            userID: targetUserID,
            userName: targetUserName,
          },
        ],
        callType,
        timeout: 60,
      });

      if (result.errorInvitees && result.errorInvitees.length > 0) {
        throw new Error(
          result.errorInvitees[0].message || "Failed to send invitation"
        );
      }

      setCallStatus({
        loading: false,
        error: null,
        success: `Call invitation sent to ${targetUserName}`,
      });
    } catch (err) {
      console.error("Call invite error:", err);

      let errorMessage = err.message;
      if (err.code === 6000104) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (err.message.includes(TOKEN)) {
        errorMessage = "Authentication failed. Please refresh the page.";
      }

      setCallStatus({
        loading: false,
        error: errorMessage,
        success: null,
      });
    }
  };

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Hey! Are we still meeting tomorrow?",
      time: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "I've sent the documents you requested",
      time: new Date(Date.now() - 1000 * 60 * 30),
      unread: 0,
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "https://i.pravatar.cc/150?img=7",
      lastMessage: "Let me know when you're free for a call",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 1,
    },
  ];

  // 3D Animation variants
  const slideLeft = {
    hidden: { x: -50, opacity: 0, rotateY: -15 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    exit: { x: -50, opacity: 0, rotateY: -15 },
  };

  const slideRight = {
    hidden: { x: 50, opacity: 0, rotateY: 15 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    exit: { x: 50, opacity: 0, rotateY: 15 },
  };

  const cardVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        background: darkMode
          ? "linear-gradient(135deg, #121212 0%, #1e1e1e 100%)"
          : "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        position: "relative",
        perspective: "1000px",
      }}
    >
      {/* Notification System */}
      <Snackbar
        open={!!callStatus.error || !!callStatus.success}
        autoHideDuration={6000}
        onClose={() =>
          setCallStatus({ ...callStatus, error: null, success: null })
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={callStatus.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {callStatus.error || callStatus.success}
          {callStatus.error && (
            <button
              onClick={() => window.location.reload()}
              style={{
                marginLeft: "10px",
                background: "transparent",
                border: "none",
                color: "inherit",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
          )}
        </Alert>
      </Snackbar>

      <Stack
        direction="row"
        sx={{
          height: "100%",
          overflow: "hidden",
          padding: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Chat List Panel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            gap: 0.2,
            borderRadius: 2,
            borderBottomRightRadius: 16,
            boxShadow: darkMode
              ? "0 4px 30px rgba(0,0,0,0.3)"
              : "0 4px 30px rgba(0,0,0,0.15)",
          }}
        >
          <AnimatePresence>
            {(!isMobile || !activeChat) && (
              <motion.div
                variants={slideLeft}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                style={{
                  flex: isMobile ? "1" : "0 0 350px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D Panel Effect */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: darkMode
                      ? "linear-gradient(145deg, rgba(30,30,30,0.95) 0%, rgba(40,40,40,0.95) 100%)"
                      : "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.95) 100%)",
                    backdropFilter: "blur(12px)",
                    zIndex: 0,
                    borderRight: darkMode
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "10px 0 30px rgba(0,0,0,0.1)",
                    borderRadius: "16px 0 0 16px",
                    transform: "translateZ(20px)",
                  }}
                />

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    transform: "translateZ(30px)",
                  }}
                >
                  {/* Header */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    style={{ originX: 0 }}
                  >
                    <Box
                      sx={{
                        p: 1.9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: darkMode
                          ? "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)"
                          : "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)",
                        color: "#fff",
                        boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
                        borderRadius: "16px 0 0 0",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Video Chat App
                      </Typography>
                      <Box>
                        <IconButton
                          sx={{ color: "#fff" }}
                          onClick={() => setDarkMode(!darkMode)}
                        >
                          {darkMode ? "☀️" : "🌙"}
                        </IconButton>
                        <IconButton sx={{ color: "#fff" }}>
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Search */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    style={{ padding: "16px" }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Search chats..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px",
                          background: darkMode
                            ? "rgba(255,255,255,0.12)"
                            : "rgba(0,0,0,0.09)",
                          "& fieldset": {
                            borderColor: "transparent",
                          },
                          "&:hover fieldset": {
                            borderColor: darkMode
                              ? "rgba(255,255,255,0.3)"
                              : "rgba(0,0,0,0.2)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#6a1b9a",
                            borderWidth: "1px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#fff" : "#333",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search
                              sx={{
                                color: darkMode
                                  ? "rgba(255,255,255,0.7)"
                                  : "rgba(0,0,0,0.5)",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  {/* Chat List */}
                  <Box
                    sx={{
                      flex: 1,
                      overflowY: "auto",
                      height: "calc(100% - 150px)",
                      px: 1,
                    }}
                  >
                    {chats.map((chat) => (
                      <motion.div
                        key={chat.id}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        style={{ marginBottom: "8px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            borderRadius: "16px",
                            cursor: "pointer",
                            background:
                              activeChat === chat.name
                                ? darkMode
                                  ? "rgba(106,27,154,0.4)"
                                  : "rgba(106,27,154,0.15)"
                                : darkMode
                                  ? "rgba(255,255,255,0.05)"
                                  : "rgba(0,0,0,0.03)",
                            mb: 1,
                            border: darkMode
                              ? "1px solid rgba(255,255,255,0.05)"
                              : "1px solid rgba(0,0,0,0.05)",
                            "&:hover": {
                              background: darkMode
                                ? "rgba(106,27,154,0.6)"
                                : "rgba(106,27,154,0.25)",
                            },
                            transform: "translateZ(0)",
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => setActiveChat(chat.name)}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              chat.unread > 0 ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      backgroundColor: "#6a1b9a",
                                      color: "#fff",
                                      borderRadius: "50%",
                                      width: "20px",
                                      height: "20px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "0.7rem",
                                      fontWeight: "bold",
                                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                                    }}
                                  >
                                    {chat.unread}
                                  </Box>
                                </motion.div>
                              ) : null
                            }
                          >
                            <motion.div whileHover={{ rotate: 5 }}>
                              <Avatar
                                src={chat.avatar}
                                sx={{
                                  width: 50,
                                  height: 50,
                                  border: "2px solid #6a1b9a",
                                  boxShadow: "0 4px 10px rgba(106,27,154,0.3)",
                                }}
                              />
                            </motion.div>
                          </Badge>
                          <Box sx={{ ml: 2, flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: 600,
                                  color: darkMode ? "#fff" : "#333",
                                  textShadow: darkMode
                                    ? "0 1px 2px rgba(0,0,0,0.3)"
                                    : "none",
                                }}
                              >
                                {chat.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: darkMode
                                    ? "rgba(255,255,255,0.6)"
                                    : "rgba(0,0,0,0.6)",
                                  fontSize: "0.7rem",
                                }}
                              >
                                {moment(chat.time).format("h:mm A")}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: darkMode
                                  ? "rgba(255,255,255,0.8)"
                                  : "rgba(0,0,0,0.8)",
                                fontSize: "0.85rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {chat.lastMessage}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages Panel */}
          <AnimatePresence>
            {(!isMobile || activeChat) && (
              <motion.div
                variants={slideRight}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D Panel Background */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: darkMode
                      ? "linear-gradient(145deg, rgba(18,18,18,0.95) 0%, rgba(30,30,30,0.95) 100%)"
                      : "linear-gradient(145deg, rgba(245,245,245,0.95) 0%, rgba(255,255,255,0.95) 100%)",
                    backdropFilter: "blur(12px)",
                    zIndex: 0,
                    boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
                    borderRadius: "0 16px 16px 0",
                    transform: "translateZ(20px)",
                  }}
                />

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    transform: "translateZ(30px)",
                  }}
                >
                  {/* Chat Header */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    style={{ originX: 0 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        background: darkMode
                          ? "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)"
                          : "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)",
                        color: "#fff",
                        boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
                        borderRadius: "0 16px 0 0",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {isMobile && (
                        <IconButton
                          sx={{ color: "#fff", mr: 1 }}
                          onClick={() => setActiveChat(null)}
                        >
                          <ArrowBack />
                        </IconButton>
                      )}
                      <motion.div whileHover={{ rotate: 10 }}>
                        <Avatar
                          src="https://i.pravatar.cc/150?img=3"
                          sx={{
                            width: 50,
                            height: 50,
                            border: "2px solid #fff",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                          }}
                        />
                      </motion.div>
                      <Box sx={{ ml: 2, flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {activeChat || "Alice Johnson"}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "rgba(255,255,255,0.8)",
                          }}
                        >
                          <Box
                            sx={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: "#4caf50",
                              mr: 1,
                              boxShadow: "0 0 5px #4caf50",
                            }}
                          />
                          Online
                        </Typography>
                      </Box>
                      <Box sx={{ mr: 2 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.7rem",
                            display: "block",
                          }}
                        >
                          {/* ID: {userID} */}
                          ID: {promptId}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.7rem",
                          }}
                        >
                          Name: {promptUserName}
                        </Typography>
                      </Box>
                      <Box>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            sx={{ color: "#fff" }}
                            onClick={() =>
                              callInvite(
                                ZegoUIKitPrebuilt.InvitationTypeVideoCall
                              )
                            }
                            disabled={callStatus.loading}
                          >
                            {callStatus.loading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              <MdVideoCall />
                            )}
                          </IconButton>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            sx={{ color: "#fff" }}
                            onClick={() =>
                              callInvite(
                                ZegoUIKitPrebuilt.InvitationTypeVoiceCall
                              )
                            }
                            disabled={callStatus.loading}
                          >
                            {callStatus.loading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              <MdCall />
                            )}
                          </IconButton>
                        </motion.div>
                      </Box>
                      <IconButton sx={{ color: "#fff" }}>
                        <Search />
                      </IconButton>
                      <IconButton sx={{ color: "#fff" }}>
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </motion.div>

                  {/* Messages */}
                  <Box
                    sx={{
                      flex: 1,
                      overflowY: "auto",
                      p: 3,
                      height: "calc(100% - 130px)",
                      backgroundImage: darkMode
                        ? "radial-gradient(circle at center, rgba(106,27,154,0.08) 0%, transparent 70%)"
                        : "radial-gradient(circle at center, rgba(106,27,154,0.05) 0%, transparent 70%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            maxWidth: "70%",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              p: 2,
                              background: darkMode
                                ? "rgba(106,27,154,0.3)"
                                : "rgba(106,27,154,0.1)",
                              borderRadius: "16px 16px 16px 4px",
                              color: darkMode ? "#fff" : "#333",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            }}
                          >
                            Hey there! How's it going?
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 0.5,
                              color: darkMode
                                ? "rgba(255,255,255,0.5)"
                                : "rgba(0,0,0,0.5)",
                            }}
                          >
                            {moment(
                              new Date(Date.now() - 1000 * 60 * 10)
                            ).format("h:mm A")}
                          </Typography>
                        </Box>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            alignSelf: "flex-end",
                            maxWidth: "70%",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              p: 2,
                              background: darkMode
                                ? "rgba(66,66,66,0.7)"
                                : "rgba(0,0,0,0.05)",
                              borderRadius: "16px 16px 4px 16px",
                              color: darkMode ? "#fff" : "#333",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            }}
                          >
                            I'm doing great! Just finished that project we were
                            working on.
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 0.5,
                              color: darkMode
                                ? "rgba(255,255,255,0.5)"
                                : "rgba(0,0,0,0.5)",
                            }}
                          >
                            {moment(
                              new Date(Date.now() - 1000 * 60 * 8)
                            ).format("h:mm A")}
                          </Typography>
                        </Box>
                      </motion.div>
                    </Box>
                  </Box>

                  {/* Message Input */}
                  <Box
                    sx={{
                      p: 2,
                      background: darkMode
                        ? "rgba(30,30,30,0.85)"
                        : "rgba(255,255,255,0.85)",
                      borderTop: darkMode
                        ? "1px solid rgba(255,255,255,0.15)"
                        : "1px solid rgba(0,0,0,0.1)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "0 0 16px 0",
                    }}
                  >
                    <motion.div whileHover={{ y: -2 }}>
                      <Paper
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "50px",
                          background: darkMode
                            ? "rgba(255,255,255,0.12)"
                            : "rgba(0,0,0,0.05)",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                          border: darkMode
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(0,0,0,0.1)",
                        }}
                      >
                        <IconButton sx={{ p: "10px" }}>
                          <AttachFile
                            sx={{
                              color: darkMode
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.5)",
                            }}
                          />
                        </IconButton>
                        <TextField
                          fullWidth
                          placeholder="Type a message..."
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                            sx: {
                              color: darkMode ? "#fff" : "#333",
                              "&::placeholder": {
                                color: darkMode
                                  ? "rgba(255,255,255,0.5)"
                                  : "rgba(0,0,0,0.5)",
                              },
                            },
                          }}
                          sx={{
                            mx: 1,
                          }}
                        />
                        <IconButton sx={{ p: "10px" }}>
                          <Mood
                            sx={{
                              color: darkMode
                                ? "rgba(255,255,255,0.7)"
                                : "rgba(0,0,0,0.5)",
                            }}
                          />
                        </IconButton>
                        <Divider
                          sx={{
                            height: 28,
                            m: 0.5,
                            borderColor: darkMode
                              ? "rgba(255,255,255,0.2)"
                              : "rgba(0,0,0,0.2)",
                          }}
                          orientation="vertical"
                        />
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            color="primary"
                            sx={{
                              p: "10px",
                              background:
                                "linear-gradient(145deg, #6a1b9a 0%, #9c27b0 100%)",
                              color: "#fff",
                              boxShadow: "0 4px 10px rgba(106,27,154,0.3)",
                              "&:hover": {
                                background:
                                  "linear-gradient(145deg, #7b1fa2 0%, #ab47bc 100%)",
                              },
                            }}
                          >
                            <Send />
                          </IconButton>
                        </motion.div>
                      </Paper>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Stack>
    </Box>
  );
};

export default Message;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Stack,
//   Typography,
//   IconButton,
//   Avatar,
//   useMediaQuery,
//   TextField,
//   InputAdornment,
//   Paper,
//   Divider,
//   Badge,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
// } from "@mui/material";
// import {
//   Search,
//   MoreVert,
//   ArrowBack,
//   Send,
//   AttachFile,
//   Mood,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import moment from "moment";
// import { MdCall, MdVideoCall } from "react-icons/md";
// import { ZIM } from "zego-zim-web";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useSelector } from "react-redux";
// import { useMyInfoQuery } from "../../../redux/service";

// const Message = () => {
//   const isMobile = useMediaQuery("(max-width:900px)");
//   const [activeChat, setActiveChat] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   const [callStatus, setCallStatus] = useState({
//     loading: false,
//     error: null,
//     success: null,
//   });
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState(new Set());

//   const zpRef = useRef();
//   const messageEndRef = useRef();

//   const { data: myInfo } = useMyInfoQuery();
//   const { user } = useSelector((state) => state.service);

//   // Get real user data from your API
//   useEffect(() => {
//     // In a real app, you would fetch users from your API
//     // For now, we'll simulate with sample data but structure it properly
//     const fetchUsers = async () => {
//       try {
//         // This would be your actual API call
//         const response = await fetch('http://localhost:5000/api/users');
//         const userData = await response.json();

//         // Simulating API response with proper user structure
//         // const userData = [
//         //   {
//         //     id: "user_1234",
//         //     name: "Alice Johnson",
//         //     avatar: "https://i.pravatar.cc/150?img=3",
//         //     lastMessage: "Hey! Are we still meeting tomorrow?",
//         //     time: new Date(Date.now() - 1000 * 60 * 5),
//         //     unread: 2,
//         //   },
//         //   {
//         //     id: "user_5678",
//         //     name: "Bob Smith",
//         //     avatar: "https://i.pravatar.cc/150?img=5",
//         //     lastMessage: "I've sent the documents you requested",
//         //     time: new Date(Date.now() - 1000 * 60 * 30),
//         //     unread: 0,
//         //   },
//         //   {
//         //     id: "user_9012",
//         //     name: "Charlie Brown",
//         //     avatar: "https://i.pravatar.cc/150?img=7",
//         //     lastMessage: "Let me know when you're free for a call",
//         //     time: new Date(Date.now() - 1000 * 60 * 60 * 2),
//         //     unread: 1,
//         //   },
//         // ];

//         setUsers(userData);

//         // Initialize messages for each user
//         const initialMessages = {};
//         userData.forEach(user => {
//           initialMessages[user.id] = [
//             {
//               id: 1,
//               sender: user.id,
//               text: user.lastMessage,
//               time: user.time,
//             },
//             {
//               id: 2,
//               sender: myInfo?.me?._id || "current_user",
//               text: "Thanks for your message!",
//               time: new Date(Date.now() - 1000 * 60 * 4),
//             },
//           ];
//         });

//         setMessages(initialMessages);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//     };

//     if (myInfo) {
//       fetchUsers();
//     }
//   }, [myInfo]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, activeChat]);

//   // ZegoCloud credentials - using actual user data
//   const userID = myInfo?.me?._id || `user_${Math.floor(Math.random() * 10000)}`;
//   const userName = myInfo?.me?.name || `User_${userID}`;
//   const appID = 85089481;
//   const serverSecret = "6e7b182cb22d1a8a4a2020dd709c6e85";

//   // Generate token with actual user data
//   const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
//     appID,
//     serverSecret,
//     null,
//     userID,
//     userName
//   );

//   // Initialize ZegoCloud
//   useEffect(() => {
//     const initializeZego = async () => {
//       try {
//         const zp = ZegoUIKitPrebuilt.create(TOKEN);
//         await zp.addPlugins({ ZIM });
//         zpRef.current = zp;

//         // Set up event listeners for incoming calls
//         zp.on('invitationReceived', (invitation) => {
//           // Handle incoming call invitation
//           const confirmCall = window.confirm(
//             `Incoming ${invitation.type === 0 ? 'voice' : 'video'} call from ${invitation.inviter.userName}. Accept?`
//           );

//           if (confirmCall) {
//             // Join the call
//             zp.joinRoom({
//               container: document.createElement('div'), // You'll need to render this properly
//               scenario: {
//                 mode: ZegoUIKitPrebuilt.OneONoneCall,
//               },
//               turnOnMicrophoneWhenJoining: invitation.type === 0,
//               turnOnCameraWhenJoining: invitation.type === 1,
//             });
//           } else {
//             // Decline the call
//             zp.refuseInvitation(invitation);
//           }
//         });

//         console.log("ZegoCloud initialized successfully");
//       } catch (err) {
//         console.error("ZegoCloud initialization failed:", err);
//         setCallStatus({
//           ...callStatus,
//           error: "Failed to initialize video call service. Please refresh the page.",
//         });
//       }
//     };

//     if (myInfo) {
//       initializeZego();
//     }

//     return () => {
//       if (zpRef.current) {
//         zpRef.current.destroy();
//       }
//     };
//   }, [myInfo]);

//   // Enhanced call invitation function with real user targeting
//   const callInvite = async (callType, targetUser) => {
//     if (!targetUser) return;

//     setCallStatus({
//       loading: true,
//       error: null,
//       success: null,
//     });

//     try {
//       if (!zpRef.current) {
//         throw new Error("Video call service not initialized");
//       }

//       if (!navigator.onLine) {
//         throw new Error("No internet connection. Please check your network.");
//       }

//       const result = await zpRef.current.sendCallInvitation({
//         callees: [
//           {
//             userID: targetUser.id,
//             userName: targetUser.name,
//           },
//         ],
//         callType,
//         timeout: 60,
//       });

//       if (result.errorInvitees && result.errorInvitees.length > 0) {
//         throw new Error(
//           result.errorInvitees[0].message || "Failed to send invitation"
//         );
//       }

//       setCallStatus({
//         loading: false,
//         error: null,
//         success: `Call invitation sent to ${targetUser.name}`,
//       });
//     } catch (err) {
//       console.error("Call invite error:", err);

//       let errorMessage = err.message;
//       if (err.code === 6000104) {
//         errorMessage = "Network error. Please check your connection and try again.";
//       } else if (err.message.includes(TOKEN)) {
//         errorMessage = "Authentication failed. Please refresh the page.";
//       }

//       setCallStatus({
//         loading: false,
//         error: errorMessage,
//         success: null,
//       });
//     }
//   };

//   // Send a new message
//   const sendMessage = () => {
//     if (!newMessage.trim() || !activeChat) return;

//     const newMsg = {
//       id: Date.now(),
//       sender: userID,
//       text: newMessage,
//       time: new Date(),
//     };

//     setMessages(prev => ({
//       ...prev,
//       [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
//     }));

//     setNewMessage("");

//     // In a real app, you would send the message to your server here
//     // and update the message list when you get a response
//   };

//   // 3D Animation variants
//   const slideLeft = {
//     hidden: { x: -50, opacity: 0, rotateY: -15 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       rotateY: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//     exit: { x: -50, opacity: 0, rotateY: -15 },
//   };

//   const slideRight = {
//     hidden: { x: 50, opacity: 0, rotateY: 15 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       rotateY: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//     exit: { x: 50, opacity: 0, rotateY: 15 },
//   };

//   const cardVariants = {
//     hover: {
//       y: -5,
//       scale: 1.02,
//       boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
//       transition: { duration: 0.3 },
//     },
//     tap: { scale: 0.98 },
//   };

//   // Filter users based on search query
//   const filteredUsers = userData.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         overflow: "hidden",
//         background: darkMode
//           ? "linear-gradient(135deg, #121212 0%, #1e1e1e 100%)"
//           : "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
//         position: "relative",
//         perspective: "1000px",
//       }}
//     >
//       {/* Notification System */}
//       <Snackbar
//         open={!!callStatus.error || !!callStatus.success}
//         autoHideDuration={6000}
//         onClose={() =>
//           setCallStatus({ ...callStatus, error: null, success: null })
//         }
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           severity={callStatus.error ? "error" : "success"}
//           sx={{ width: "100%" }}
//         >
//           {callStatus.error || callStatus.success}
//           {callStatus.error && (
//             <button
//               onClick={() => window.location.reload()}
//               style={{
//                 marginLeft: "10px",
//                 background: "transparent",
//                 border: "none",
//                 color: "inherit",
//                 textDecoration: "underline",
//                 cursor: "pointer",
//               }}
//             >
//               Refresh
//             </button>
//           )}
//         </Alert>
//       </Snackbar>

//       <Stack
//         direction="row"
//         sx={{
//           height: "100%",
//           overflow: "hidden",
//           padding: 0,
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* Chat List Panel */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             width: "100%",
//             height: "100vh",
//             overflow: "hidden",
//             gap: 0.2,
//             borderRadius: 2,
//             borderBottomRightRadius: 16,
//             boxShadow: darkMode
//               ? "0 4px 30px rgba(0,0,0,0.3)"
//               : "0 4px 30px rgba(0,0,0,0.15)",
//           }}
//         >
//           <AnimatePresence>
//             {(!isMobile || !activeChat) && (
//               <motion.div
//                 variants={slideLeft}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ duration: 0.5 }}
//                 style={{
//                   flex: isMobile ? "1" : "0 0 350px",
//                   display: "flex",
//                   flexDirection: "column",
//                   position: "relative",
//                   transformStyle: "preserve-3d",
//                 }}
//               >
//                 {/* 3D Panel Effect */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: darkMode
//                       ? "linear-gradient(145deg, rgba(30,30,30,0.95) 0%, rgba(40,40,40,0.95) 100%)"
//                       : "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.95) 100%)",
//                     backdropFilter: "blur(12px)",
//                     zIndex: 0,
//                     borderRight: darkMode
//                       ? "1px solid rgba(255,255,255,0.15)"
//                       : "1px solid rgba(0,0,0,0.1)",
//                     boxShadow: "10px 0 30px rgba(0,0,0,0.1)",
//                     borderRadius: "16px 0 0 16px",
//                     transform: "translateZ(20px)",
//                   }}
//                 />

//                 <Box
//                   sx={{
//                     position: "relative",
//                     zIndex: 1,
//                     height: "100%",
//                     transform: "translateZ(30px)",
//                   }}
//                 >
//                   {/* Header */}
//                   <motion.div
//                     whileHover={{ scale: 1.01 }}
//                     style={{ originX: 0 }}
//                   >
//                     <Box
//                       sx={{
//                         p: 1.9,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         background: darkMode
//                           ? "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)"
//                           : "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)",
//                         color: "#fff",
//                         boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
//                         borderRadius: "16px 0 0 0",
//                         borderBottom: "1px solid rgba(255,255,255,0.1)",
//                       }}
//                     >
//                       <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                         Video Chat App
//                       </Typography>
//                       <Box>
//                         <IconButton
//                           sx={{ color: "#fff" }}
//                           onClick={() => setDarkMode(!darkMode)}
//                         >
//                           {darkMode ? "☀️" : "🌙"}
//                         </IconButton>
//                         <IconButton sx={{ color: "#fff" }}>
//                           <MoreVert />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                   </motion.div>

//                   {/* Search */}
//                   <motion.div
//                     whileHover={{ y: -2 }}
//                     style={{ padding: "16px" }}
//                   >
//                     <TextField
//                       fullWidth
//                       placeholder="Search chats..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: "50px",
//                           background: darkMode
//                             ? "rgba(255,255,255,0.12)"
//                             : "rgba(0,0,0,0.09)",
//                           "& fieldset": {
//                             borderColor: "transparent",
//                           },
//                           "&:hover fieldset": {
//                             borderColor: darkMode
//                               ? "rgba(255,255,255,0.3)"
//                               : "rgba(0,0,0,0.2)",
//                           },
//                           "&.Mui-focused fieldset": {
//                             borderColor: "#6a1b9a",
//                             borderWidth: "1px",
//                           },
//                         },
//                         "& .MuiInputBase-input": {
//                           color: darkMode ? "#fff" : "#333",
//                         },
//                       }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <Search
//                               sx={{
//                                 color: darkMode
//                                   ? "rgba(255,255,255,0.7)"
//                                   : "rgba(0,0,0,0.5)",
//                               }}
//                             />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </motion.div>

//                   {/* Chat List */}
//                   <Box
//                     sx={{
//                       flex: 1,
//                       overflowY: "auto",
//                       height: "calc(100% - 150px)",
//                       px: 1,
//                     }}
//                   >
//                     {filteredUsers.map((user) => (
//                       <motion.div
//                         key={user.id}
//                         variants={cardVariants}
//                         whileHover="hover"
//                         whileTap="tap"
//                         style={{ marginBottom: "8px" }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             p: 2,
//                             borderRadius: "16px",
//                             cursor: "pointer",
//                             background:
//                               activeChat?.id === user.id
//                                 ? darkMode
//                                   ? "rgba(106,27,154,0.4)"
//                                   : "rgba(106,27,154,0.15)"
//                                 : darkMode
//                                   ? "rgba(255,255,255,0.05)"
//                                   : "rgba(0,0,0,0.03)",
//                             mb: 1,
//                             border: darkMode
//                               ? "1px solid rgba(255,255,255,0.05)"
//                               : "1px solid rgba(0,0,0,0.05)",
//                             "&:hover": {
//                               background: darkMode
//                                 ? "rgba(106,27,154,0.6)"
//                                 : "rgba(106,27,154,0.25)",
//                             },
//                             transform: "translateZ(0)",
//                             transition: "all 0.3s ease",
//                           }}
//                           onClick={() => setActiveChat(user)}
//                         >
//                           <Badge
//                             overlap="circular"
//                             anchorOrigin={{
//                               vertical: "bottom",
//                               horizontal: "right",
//                             }}
//                             badgeContent={
//                               user.unread > 0 ? (
//                                 <motion.div
//                                   initial={{ scale: 0 }}
//                                   animate={{ scale: 1 }}
//                                   transition={{
//                                     type: "spring",
//                                     stiffness: 500,
//                                   }}
//                                 >
//                                   <Box
//                                     sx={{
//                                       backgroundColor: "#6a1b9a",
//                                       color: "#fff",
//                                       borderRadius: "50%",
//                                       width: "20px",
//                                       height: "20px",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       justifyContent: "center",
//                                       fontSize: "0.7rem",
//                                       fontWeight: "bold",
//                                       boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//                                     }}
//                                   >
//                                     {user.unread}
//                                   </Box>
//                                 </motion.div>
//                               ) : null
//                             }
//                           >
//                             <motion.div whileHover={{ rotate: 5 }}>
//                               <Avatar
//                                 src={user.avatar}
//                                 sx={{
//                                   width: 50,
//                                   height: 50,
//                                   border: "2px solid #6a1b9a",
//                                   boxShadow: "0 4px 10px rgba(106,27,154,0.3)",
//                                 }}
//                               />
//                             </motion.div>
//                           </Badge>
//                           <Box sx={{ ml: 2, flex: 1 }}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <Typography
//                                 variant="subtitle1"
//                                 sx={{
//                                   fontWeight: 600,
//                                   color: darkMode ? "#fff" : "#333",
//                                   textShadow: darkMode
//                                     ? "0 1px 2px rgba(0,0,0,0.3)"
//                                     : "none",
//                                 }}
//                               >
//                                 {user.name}
//                               </Typography>
//                               <Typography
//                                 variant="caption"
//                                 sx={{
//                                   color: darkMode
//                                     ? "rgba(255,255,255,0.6)"
//                                     : "rgba(0,0,0,0.6)",
//                                   fontSize: "0.7rem",
//                                 }}
//                               >
//                                 {moment(user.time).format("h:mm A")}
//                               </Typography>
//                             </Box>
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 color: darkMode
//                                   ? "rgba(255,255,255,0.8)"
//                                   : "rgba(0,0,0,0.8)",
//                                 fontSize: "0.85rem",
//                                 whiteSpace: "nowrap",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                               }}
//                             >
//                               {user.lastMessage}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </motion.div>
//                     ))}
//                   </Box>
//                 </Box>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Messages Panel */}
//           <AnimatePresence>
//             {(!isMobile || activeChat) && (
//               <motion.div
//                 variants={slideRight}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ duration: 0.5 }}
//                 style={{
//                   flex: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   position: "relative",
//                   transformStyle: "preserve-3d",
//                 }}
//               >
//                 {/* 3D Panel Background */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: darkMode
//                       ? "linear-gradient(145deg, rgba(18,18,18,0.95) 0%, rgba(30,30,30,0.95) 100%)"
//                       : "linear-gradient(145deg, rgba(245,245,245,0.95) 0%, rgba(255,255,255,0.95) 100%)",
//                     backdropFilter: "blur(12px)",
//                     zIndex: 0,
//                     boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
//                     borderRadius: "0 16px 16px 0",
//                     transform: "translateZ(20px)",
//                   }}
//                 />

//                 <Box
//                   sx={{
//                     position: "relative",
//                     zIndex: 1,
//                     height: "100%",
//                     transform: "translateZ(30px)",
//                   }}
//                 >
//                   {/* Chat Header */}
//                   <motion.div
//                     whileHover={{ scale: 1.01 }}
//                     style={{ originX: 0 }}
//                   >
//                     <Box
//                       sx={{
//                         p: 2,
//                         display: "flex",
//                         alignItems: "center",
//                         background: darkMode
//                           ? "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)"
//                           : "linear-gradient(145deg, rgba(106,27,154,0.9) 0%, rgba(156,39,176,0.9) 100%)",
//                         color: "#fff",
//                         boxShadow: "0 5px 25px rgba(0,0,0,0.2)",
//                         borderRadius: "0 16px 0 0",
//                         borderBottom: "1px solid rgba(255,255,255,0.1)",
//                       }}
//                     >
//                       {isMobile && (
//                         <IconButton
//                           sx={{ color: "#fff", mr: 1 }}
//                           onClick={() => setActiveChat(null)}
//                         >
//                           <ArrowBack />
//                         </IconButton>
//                       )}
//                       <motion.div whileHover={{ rotate: 10 }}>
//                         <Avatar
//                           src={activeChat?.avatar || "https://i.pravatar.cc/150?img=3"}
//                           sx={{
//                             width: 50,
//                             height: 50,
//                             border: "2px solid #fff",
//                             boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//                           }}
//                         />
//                       </motion.div>
//                       <Box sx={{ ml: 2, flex: 1 }}>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{ fontWeight: 600 }}
//                         >
//                           {activeChat?.name || "Select a chat"}
//                         </Typography>
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             color: "rgba(255,255,255,0.8)",
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: "8px",
//                               height: "8px",
//                               borderRadius: "50%",
//                               background: "#4caf50",
//                               mr: 1,
//                               boxShadow: "0 0 5px #4caf50",
//                             }}
//                           />
//                           Online
//                         </Typography>
//                       </Box>
//                       <Box sx={{ mr: 2 }}>
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "rgba(255,255,255,0.7)",
//                             fontSize: "0.7rem",
//                             display: "block",
//                           }}
//                         >
//                           ID: {userID}
//                         </Typography>
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "rgba(255,255,255,0.7)",
//                             fontSize: "0.7rem",
//                           }}
//                         >
//                           Name: {userName}
//                         </Typography>
//                       </Box>
//                       <Box>
//                         {activeChat && (
//                           <>
//                             <motion.div
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                             >
//                               <IconButton
//                                 sx={{ color: "#fff" }}
//                                 onClick={() =>
//                                   callInvite(
//                                     ZegoUIKitPrebuilt.InvitationTypeVideoCall,
//                                     activeChat
//                                   )
//                                 }
//                                 disabled={callStatus.loading}
//                               >
//                                 {callStatus.loading ? (
//                                   <CircularProgress size={24} color="inherit" />
//                                 ) : (
//                                   <MdVideoCall />
//                                 )}
//                               </IconButton>
//                             </motion.div>

//                             <motion.div
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                             >
//                               <IconButton
//                                 sx={{ color: "#fff" }}
//                                 onClick={() =>
//                                   callInvite(
//                                     ZegoUIKitPrebuilt.InvitationTypeVoiceCall,
//                                     activeChat
//                                   )
//                                 }
//                                 disabled={callStatus.loading}
//                               >
//                                 {callStatus.loading ? (
//                                   <CircularProgress size={24} color="inherit" />
//                                 ) : (
//                                   <MdCall />
//                                 )}
//                               </IconButton>
//                             </motion.div>
//                           </>
//                         )}
//                       </Box>
//                       <IconButton sx={{ color: "#fff" }}>
//                         <Search />
//                       </IconButton>
//                       <IconButton sx={{ color: "#fff" }}>
//                         <MoreVert />
//                       </IconButton>
//                     </Box>
//                   </motion.div>

//                   {/* Messages */}
//                   <Box
//                     sx={{
//                       flex: 1,
//                       overflowY: "auto",
//                       p: 3,
//                       height: "calc(100% - 130px)",
//                       backgroundImage: darkMode
//                         ? "radial-gradient(circle at center, rgba(106,27,154,0.08) 0%, transparent 70%)"
//                         : "radial-gradient(circle at center, rgba(106,27,154,0.05) 0%, transparent 70%)",
//                     }}
//                   >
//                     {activeChat ? (
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 2,
//                         }}
//                       >
//                         {messages[activeChat.id]?.map((message) => (
//                           <motion.div
//                             key={message.id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: message.sender === userID ? "flex-end" : "flex-start",
//                                 alignSelf: message.sender === userID ? "flex-end" : "flex-start",
//                                 maxWidth: "70%",
//                               }}
//                             >
//                               <Typography
//                                 variant="body2"
//                                 sx={{
//                                   p: 2,
//                                   background: message.sender === userID
//                                     ? darkMode
//                                       ? "rgba(66,66,66,0.7)"
//                                       : "rgba(0,0,0,0.05)"
//                                     : darkMode
//                                       ? "rgba(106,27,154,0.3)"
//                                       : "rgba(106,27,154,0.1)",
//                                   borderRadius: message.sender === userID
//                                     ? "16px 16px 4px 16px"
//                                     : "16px 16px 16px 4px",
//                                   color: darkMode ? "#fff" : "#333",
//                                   boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                                 }}
//                               >
//                                 {message.text}
//                               </Typography>
//                               <Typography
//                                 variant="caption"
//                                 sx={{
//                                   mt: 0.5,
//                                   color: darkMode
//                                     ? "rgba(255,255,255,0.5)"
//                                     : "rgba(0,0,0,0.5)",
//                                 }}
//                               >
//                                 {moment(message.time).format("h:mm A")}
//                               </Typography>
//                             </Box>
//                           </motion.div>
//                         ))}
//                         <div ref={messageEndRef} />
//                       </Box>
//                     ) : (
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           height: "100%",
//                           color: darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
//                         }}
//                       >
//                         <Typography variant="h6">
//                           Select a conversation to start chatting
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>

//                   {/* Message Input */}
//                   {activeChat && (
//                     <Box
//                       sx={{
//                         p: 2,
//                         background: darkMode
//                           ? "rgba(30,30,30,0.85)"
//                           : "rgba(255,255,255,0.85)",
//                         borderTop: darkMode
//                           ? "1px solid rgba(255,255,255,0.15)"
//                           : "1px solid rgba(0,0,0,0.1)",
//                         backdropFilter: "blur(12px)",
//                         borderRadius: "0 0 16px 0",
//                       }}
//                     >
//                       <motion.div whileHover={{ y: -2 }}>
//                         <Paper
//                           sx={{
//                             p: "2px 4px",
//                             display: "flex",
//                             alignItems: "center",
//                             borderRadius: "50px",
//                             background: darkMode
//                               ? "rgba(255,255,255,0.12)"
//                               : "rgba(0,0,0,0.05)",
//                             boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//                             border: darkMode
//                               ? "1px solid rgba(255,255,255,0.1)"
//                               : "1px solid rgba(0,0,0,0.1)",
//                           }}
//                         >
//                           <IconButton sx={{ p: "10px" }}>
//                             <AttachFile
//                               sx={{
//                                 color: darkMode
//                                   ? "rgba(255,255,255,0.7)"
//                                   : "rgba(0,0,0,0.5)",
//                               }}
//                             />
//                           </IconButton>
//                           <TextField
//                             fullWidth
//                             placeholder="Type a message..."
//                             variant="standard"
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             onKeyPress={(e) => {
//                               if (e.key === 'Enter') {
//                                 sendMessage();
//                               }
//                             }}
//                             InputProps={{
//                               disableUnderline: true,
//                               sx: {
//                                 color: darkMode ? "#fff" : "#333",
//                                 "&::placeholder": {
//                                   color: darkMode
//                                     ? "rgba(255,255,255,0.5)"
//                                     : "rgba(0,0,0,0.5)",
//                                 },
//                               },
//                             }}
//                             sx={{
//                               mx: 1,
//                             }}
//                           />
//                           <IconButton sx={{ p: "10px" }}>
//                             <Mood
//                               sx={{
//                                 color: darkMode
//                                   ? "rgba(255,255,255,0.7)"
//                                   : "rgba(0,0,0,0.5)",
//                               }}
//                             />
//                           </IconButton>
//                           <Divider
//                             sx={{
//                               height: 28,
//                               m: 0.5,
//                               borderColor: darkMode
//                                 ? "rgba(255,255,255,0.2)"
//                                 : "rgba(0,0,0,0.2)",
//                             }}
//                             orientation="vertical"
//                           />
//                           <motion.div
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                           >
//                             <IconButton
//                               color="primary"
//                               sx={{
//                                 p: "10px",
//                                 background:
//                                   "linear-gradient(145deg, #6a1b9a 0%, #9c27b0 100%)",
//                                 color: "#fff",
//                                 boxShadow: "0 4px 10px rgba(106,27,154,0.3)",
//                                 "&:hover": {
//                                   background:
//                                     "linear-gradient(145deg, #7b1fa2 0%, #ab47bc 100%)",
//                                 },
//                               }}
//                               onClick={sendMessage}
//                               disabled={!newMessage.trim()}
//                             >
//                               <Send />
//                             </IconButton>
//                           </motion.div>
//                         </Paper>
//                       </motion.div>
//                     </Box>
//                   )}
//                 </Box>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default Message;
