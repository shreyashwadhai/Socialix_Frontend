// import React from "react";
// import { Button, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import errorPageImg from "../../assets/error_404_page.png";
// const Error404Page = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="h-screen mt-5 flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
//       <Box className="text-center w-[98vw] p-8 rounded-lg shadow-lg bg-white max-w-lg mx-auto">
//         {/* 3D Image */}
//         <div className="w-68 h-68 mx-auto mb-8">
//           <img
//             src={errorPageImg} // Replace with your 3D illustration path
//             alt="Lost in Space"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Error Message */}
//         <Typography variant="h1" className="text-6xl font-bold text-blue-650">
//           404
//         </Typography>
//         <Typography variant="h5" className="text-2xl font-semibold mt-2">
//           Oops! Page Not Found
//         </Typography>
//         <Typography className="mt-4 pb-8 text-gray-650">
//           It seems like the page you're looking for doesn't exist.
//         </Typography>

//         {/* Go Home Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate(-1)}
//           className=" bg-blue-650 hover:bg-blue-700 px-6 py-3 text-white text-lg"
//         >
//           Go to Home
//         </Button>
//       </Box>
//     </div>
//   );
// };

// export default Error404Page;


import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import errorPageImg from "../../assets/error_404_page.png";
import { motion } from "framer-motion";

const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        p: 2
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: 500,
            mx: 'auto',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box
            component="img"
            src={errorPageImg}
            alt="Lost in Space"
            sx={{
              width: '100%',
              maxWidth: 300,
              height: 'auto',
              mb: 3,
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: '4rem',
              fontWeight: 700,
              color: '#6a1b9a',
              mb: 1
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'text.primary'
            }}
          >
            Oops! Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'text.secondary'
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #6a1b9a 0%, #9c27b0 100%)',
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(106,27,154,0.3)'
              }}
            >
              Go Back
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Error404Page;