// import { Stack, CircularProgress } from "@mui/material";

// const Loading = () => {
//   return (
//     <>
//       <Stack
//         flexDirection={"row"}
//         minHeight={"50vw"}
//         width={"100%"}
//         height={"100%"}
//         justifyContent={"center"}
//         alignItems={"center"}
//         my={5}
//       >
//         <CircularProgress color="success" />
//       </Stack>
//     </>
//   );
// };

// export default Loading;


import { Stack, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: '100%' }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        sx={{
          background: 'transparent',
        }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{
              color: 'primary.main',
              filter: 'drop-shadow(0 0 8px rgba(106, 27, 154, 0.5))'
            }} 
          />
        </motion.div>
      </Stack>
    </motion.div>
  );
};

export default Loading;