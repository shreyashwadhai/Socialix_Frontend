import { motion, AnimatePresence } from "framer-motion";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Close, CameraAlt, Edit } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel } from "../../redux/slice";
import { useUpdateProfileMutation } from "../../redux/service";

const EditProfile = () => {
  const { openEditProfileModel, myInfo } = useSelector(
    (state) => state.service
  );
  const [updateProfile] = useUpdateProfileMutation();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [pic, setPic] = useState(null);
  const [bio, setBio] = useState(myInfo?.bio || "");
  const imgRef = useRef();
  const dispatch = useDispatch();

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: { y: "50vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: { type: "spring", damping: 25 },
    },
  };

  const handleClose = () => dispatch(editProfileModel(false));
  const handleUpdate = async () => {
    const formData = new FormData();
    if (bio !== myInfo?.bio) formData.append("text", bio);
    if (pic) formData.append("media", pic);
    await updateProfile(formData);
    handleClose();
  };

  return (
    <AnimatePresence>
      {openEditProfileModel && (
        <Dialog
          fullWidth
          maxWidth="sm"
          fullScreen={isMobile}
          open={openEditProfileModel}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: isMobile ? 0 : "12px",
              overflow: "hidden",
              bgcolor: "background.paper",
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
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
              }}
            >
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
              <Typography variant="h6" fontWeight={600}>
                Edit Profile
              </Typography>
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                Save
              </Button>
            </Stack>

            <DialogContent sx={{ p: 3 }}>
              <Stack spacing={3} alignItems="center">
                <Box sx={{ position: "relative" }}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Avatar
                      src={pic ? URL.createObjectURL(pic) : myInfo?.profilePic}
                      sx={{
                        width: 120,
                        height: 120,
                        border: "3px solid",
                        borderColor: "primary.main",
                      }}
                    />
                  </motion.div>
                  <IconButton
                    onClick={() => imgRef.current.click()}
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    <CameraAlt fontSize="small" />
                  </IconButton>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imgRef}
                    onChange={(e) => setPic(e.target.files[0])}
                    hidden
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Username"
                  value={myInfo?.userName || ""}
                  InputProps={{
                    readOnly: true,
                    endAdornment: <Edit color="disabled" />,
                  }}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Email"
                  value={myInfo?.email || ""}
                  InputProps={{
                    readOnly: true,
                    endAdornment: <Edit color="disabled" />,
                  }}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell people about yourself..."
                  variant="outlined"
                />
              </Stack>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EditProfile;
