// import { InputAdornment, TextField } from "@mui/material";
// import { MdPersonSearch } from "react-icons/md";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLazySearchUsersQuery } from "../../redux/service";
// import { addToSearchedUsers } from "../../redux/slice";

// const SearchInput = () => {
//   const { darkMode } = useSelector((state) => state.service);

//   const [query, setQuery] = useState();
//   const [searchUSer, searchUserData] = useLazySearchUsersQuery();

//   const dispatch = useDispatch();

//   const handleSearch = async (e) => {
//     if (query && e.key === "Enter") {
//       await searchUSer(query);
//     }
//   };

//   useEffect(() => {
//     if (searchUserData.isSuccess) {
//       dispatch(addToSearchedUsers(searchUserData.data.users));
//       console.log(searchUserData.data);
//     }
//     if (searchUserData.isError) {
//       console.error(searchUserData.error.data);
//     }
//   }, [searchUserData.isSuccess, searchUserData.isError]);

//   return (
//     <>
//       <TextField
//         sx={{
//           width: "90%",
//           maxWidth: "750px",
//           boxShadow: "5px 5px 5px gray",
//           borderRadius: "15px",
//           px: 2,
//           py: 1,
//           my: 5,
//           mx: "auto",
//           "& .MuiOutlinedInput-root": {
//             color: darkMode ? "'whitesmoke" : "black",
//             "& fieldset": {
//               border: "none",
//             },
//           },
//         }}
//         placeholder="search user..."
//         InputProps={{
//           startAdornment: (
//             <InputAdornment
//               position="start"
//               sx={{
//                 color: darkMode ? "'whitesmoke" : "black",
//               }}
//             >
//               <MdPersonSearch color={darkMode ? "white" : "black"} />
//             </InputAdornment>
//           ),
//         }}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyUp={handleSearch}
//       />
//     </>
//   );
// };

// export default SearchInput;


import { InputAdornment, TextField, Box } from "@mui/material";
import { MdPersonSearch } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUsersQuery } from "../../redux/service";
import { addToSearchedUsers } from "../../redux/slice";
import { motion } from "framer-motion";

const SearchInput = () => {
  const { darkMode } = useSelector((state) => state.service);
  const [query, setQuery] = useState();
  const [searchUser, searchUserData] = useLazySearchUsersQuery();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    if (query && e.key === "Enter") await searchUser(query);
  };

  useEffect(() => {
    if (searchUserData.isSuccess) {
      dispatch(addToSearchedUsers(searchUserData.data.users));
    }
  }, [searchUserData]);

  return (
    <Box sx={{ width: '100%', px: 2, py: 3 }}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          onKeyUp={handleSearch}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: '#6a1b9a',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6a1b9a',
              },
            },
            '& .MuiInputBase-input': {
              color: darkMode ? 'white' : 'black',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdPersonSearch 
                  color={darkMode ? 'white' : 'black'} 
                  size={24}
                />
              </InputAdornment>
            ),
          }}
        />
      </motion.div>
    </Box>
  );
};

export default SearchInput;