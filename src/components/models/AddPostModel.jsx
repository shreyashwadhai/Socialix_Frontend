import { motion, AnimatePresence } from "framer-motion";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Close,
  AddPhotoAlternate,
  EmojiEmotions,
  Public,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../redux/slice";
import { useAddPostMutation } from "../../redux/service";

const AddPostModel = () => {
  const { openAddPostModel, myInfo } = useSelector((state) => state.service);
  const [addNewPost] = useAddPostMutation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const mediaRef = useRef();
  const dispatch = useDispatch();

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modal = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25 },
    },
  };

  const handleClose = () => dispatch(addPostModel(false));

  const handlePost = async () => {
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (media) formData.append("media", media);
    try {
      await addNewPost(formData).unwrap();
      handleClose();
    } catch (err) {
      console.error("Post failed:", err);
    }
  };

  return (
    <AnimatePresence>
      {openAddPostModel && (
        <Dialog
          fullWidth
          maxWidth="sm"
          fullScreen={isMobile}
          open={openAddPostModel}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: isMobile ? 0 : "16px",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            },
          }}
        >
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 2,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                background: "linear-gradient(90deg, #6a1b9a 0%, #9c27b0 100%)",
                color: "white",
              }}
            >
              <IconButton onClick={handleClose} sx={{ color: "white" }}>
                <Close />
              </IconButton>
              <Typography variant="h6" fontWeight={600}>
                Create Post
              </Typography>
              <Button
                variant="contained"
                onClick={handlePost}
                disabled={!text && !media}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  bgcolor: "white",
                  color: "#6a1b9a",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  "&:disabled": { bgcolor: "rgba(255,255,255,0.5)" },
                }}
              >
                Post
              </Button>
            </Stack>

            <DialogContent sx={{ p: 0 }}>
              <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={myInfo?.profilePic}
                    sx={{
                      width: 48,
                      height: 48,
                      border: "2px solid #6a1b9a",
                    }}
                  />
                  <Stack>
                    <Typography fontWeight={600}>{myInfo?.userName}</Typography>
                    <Button
                      size="small"
                      startIcon={<Public sx={{ fontSize: 16 }} />}
                      sx={{
                        textTransform: "none",
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        p: 0,
                        "&:hover": { bgcolor: "transparent" },
                      }}
                    >
                      Public
                    </Button>
                  </Stack>
                </Stack>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`What's on your mind, ${myInfo?.userName.split(" ")[0]}?`}
                    style={{
                      width: "100%",
                      minHeight: isMobile ? "120px" : "150px",
                      border: "none",
                      outline: "none",
                      resize: "none",
                      fontSize: "1.1rem",
                      fontFamily: "inherit",
                      backgroundColor: "transparent",
                    }}
                  />
                </motion.div>

                {media && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={URL.createObjectURL(media)}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <IconButton
                      onClick={() => setMedia(null)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      border: "1px dashed rgba(106,27,154,0.5)",
                      cursor: "pointer",
                      background: "rgba(106,27,154,0.05)",
                    }}
                    onClick={() => mediaRef.current.click()}
                  >
                    <Typography>Add to your post</Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton color="primary">
                        <AddPhotoAlternate />
                      </IconButton>
                      <IconButton color="warning">
                        <EmojiEmotions />
                      </IconButton>
                    </Stack>
                    <input
                      type="file"
                      accept="image/*"
                      ref={mediaRef}
                      onChange={(e) => setMedia(e.target.files[0])}
                      hidden
                    />
                  </Stack>
                </motion.div>
              </Stack>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AddPostModel;
