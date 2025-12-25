import { Schedule } from "@mui/icons-material";
import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

const ChatMessage = ({ text, time, isOwn, avatar, name }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "flex",
        justifyContent: isOwn ? "flex-end" : "flex-start",
        marginBottom: 12,
        width: "100%",
      }}
    >
      {/* Avatar for received messages */}
      {!isOwn && (
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 40,
            height: 40,
            marginRight: 2,
            alignSelf: "flex-end",
            border: "2px solid #6a1b9a",
          }}
        />
      )}

      {/* Message Bubble */}
      <Box
        sx={{
          maxWidth: isMobile ? "75%" : "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: isOwn ? "flex-end" : "flex-start",
        }}
      >
        {/* Sender name (optional) */}
        {!isOwn && (
          <Typography
            variant="caption"
            sx={{
              color: isOwn ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              marginBottom: "2px",
              fontWeight: 600,
            }}
          >
            {name}
          </Typography>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              background: isOwn
                ? "linear-gradient(135deg, #6a1b9a 0%, #9c27b0 100%)"
                : "rgba(255,255,255,0.9)",
              color: isOwn ? "#fff" : "#333",
              padding: "12px 16px",
              borderRadius: isOwn ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              wordBreak: "break-word",
              backdropFilter: "blur(4px)",
              border: isOwn ? "none" : "1px solid rgba(255,255,255,0.3)",
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                zIndex: 0,
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{ position: "relative", zIndex: 1 }}
            >
              {text}
            </Typography>
          </Box>
        </motion.div>

        {/* Time */}
        <Typography
          variant="caption"
          sx={{
            color: isOwn ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            fontSize: "0.7rem",
            marginTop: "4px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Schedule sx={{ fontSize: "12px" }} />
          {moment(time).format("h:mm A")}
        </Typography>
      </Box>

      {/* Avatar for sent messages */}
      {isOwn && (
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 40,
            height: 40,
            marginLeft: 2,
            alignSelf: "flex-end",
            border: "2px solid #6a1b9a",
          }}
        />
      )}
    </motion.div>
  );
};

export default ChatMessage;
