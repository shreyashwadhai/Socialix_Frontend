import { motion } from "framer-motion";
import { Menu, MenuItem } from "@mui/material";
import { Delete, Edit, Report } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";
import { useDeletePostMutation } from "../../redux/service";

const MyMenu = () => {
  const { anchorE2, postId } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [deletePost] = useDeletePostMutation();

  const handleClose = () => dispatch(toggleMyMenu(null));
  const handleDelete = async () => {
    await deletePost(postId);
    handleClose();
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <Menu
      anchorEl={anchorE2}
      open={Boolean(anchorE2)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 180,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          "& .MuiMenuItem-root": {
            px: 2,
            py: 1.5,
          },
        },
      }}
    >
      <motion.div variants={itemVariants}>
        <MenuItem onClick={handleClose}>
          <Edit sx={{ mr: 1.5, color: "primary.main" }} />
          Edit Post
        </MenuItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1.5 }} />
          Delete Post
        </MenuItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MenuItem>
          <Report sx={{ mr: 1.5, color: "warning.main" }} />
          Report
        </MenuItem>
      </motion.div>
    </Menu>
  );
};

export default MyMenu;
