import { motion } from "framer-motion";
import { Menu, MenuItem } from "@mui/material";
import {
  DarkMode,
  LightMode,
  Person,
  Logout,
  Settings,
} from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addMyInfo, toggleColorMode, toggleMainMenu } from "../../redux/slice";
import { useLogoutMeMutation } from "../../redux/service";

const MainMenu = () => {
  const { anchorE1, myInfo, darkMode } = useSelector((state) => state.service);
  const [logoutMe] = useLogoutMeMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => dispatch(toggleMainMenu(null));
  const handleToggleTheme = () => {
    dispatch(toggleColorMode());
    handleClose();
  };
  const handleLogout = async () => {
    handleClose();
    await logoutMe();
    dispatch(addMyInfo(null));
    navigate("/register");
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
      anchorEl={anchorE1}
      open={Boolean(anchorE1)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
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
        <MenuItem onClick={handleToggleTheme} sx={{ color: "text.primary" }}>
          {darkMode ? (
            <>
              <LightMode sx={{ mr: 1.5, color: "warning.main" }} />
              Light Mode
            </>
          ) : (
            <>
              <DarkMode sx={{ mr: 1.5 }} />
              Dark Mode
            </>
          )}
        </MenuItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Link
          to={`/profile/${myInfo?._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleClose}>
            <Person sx={{ mr: 1.5, color: "primary.main" }} />
            Profile
          </MenuItem>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MenuItem>
          <Settings sx={{ mr: 1.5, color: "text.secondary" }} />
          Settings
        </MenuItem>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <Logout sx={{ mr: 1.5 }} />
          Logout
        </MenuItem>
      </motion.div>
    </Menu>
  );
};

export default MainMenu;
