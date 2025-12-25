// // import {
// //   Box,
// //   Button,
// //   Link,
// //   Stack,
// //   TextField,
// //   Typography,
// //   useMediaQuery,
// // } from "@mui/material";
// // import React, { useEffect } from "react";
// // import { useState } from "react";
// // import { NavLink ,useNavigate} from "react-router-dom";
// // import { useLoginMutation, useSigninMutation } from "../../../redux/service";
// // const Register = () => {
// //   //  HOOK's
// //   const [login, setLogin] = useState(false);
// //   const [userName, setuserName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [password, setPassword] = useState("");

// //   const navigate = useNavigate();
// //   //  MUI-MediaQuery
// //   const _650 = useMediaQuery("(min-width:650px)");

// //   const [signinUser, signinUserData] = useSigninMutation();
// //   const [loginUser, loginUserData] = useLoginMutation();

// //   //  Funcation's
// //   const toggleLogin = (e) => {
// //     e.preventDefault();
// //     setLogin((pre) => !pre);
// //   };

// //   // const handleInput = () => {};

// //   const submitLogin = async (e) => {
// //     e.preventDefault();
// //     const data = {
// //       email,
// //       password,
// //     };

// //     await loginUser(data);
// //   };

// //   const submitRegister = async (e) => {
// //     e.preventDefault();
// //     const data = {
// //       userName,
// //       email,
// //       phone,
// //       password,
// //     };

// //     await signinUser(data);
// //   };

// //   useEffect(() => {
// //     if (signinUserData.isSuccess) {
// //       console.log(signinUserData.data);
// //     }

// //     if (loginUserData.isSuccess) {
// //       console.log(loginUserData.data);
// //     }
// //   }, [signinUserData.isSuccess, loginUserData.isSuccess]);

// //   return (
// //     <>
// //       <Stack className="w-full h-screen justify-center items-center bg-gray-200">
// //         <Stack className=" lg:w-[35%] md:w-[45%] sm:w-[95%] h-auto bg-gray-50 flex flex-col justify-center items-center p-3 shadow-2xl rounded-lg">
// //           <Box className="logo" sx={{ mb: -2 }}>
// //             <img
// //               src="/src/assets/app_logo.png"
// //               alt="Logo"
// //               className="rounded-full w-[60px]"
// //               // style={{ width: "56px" }}
// //             />
// //           </Box>
// //           <Typography
// //             variant="h4"
// //             fontWeight="bold"
// //             color="black"
// //             mt={4}
// //             fontSize={_650 ? "2.5rem" : "2rem"}
// //           >
// //             {login ? "Sign in" : "Welcome"} to Socialix!
// //           </Typography>
// //           <Typography variant="body2" color="gray.300" mt={2} mb={4}>
// //             {login ? null : "Register to create your first Socialix account"}
// //           </Typography>

// //           <form action="">
// //             <Box
// //               component="ul"
// //               sx={{ listStyle: "none", p: 1, m: 0 }}
// //               height={"auto"}
// //             >
// //               {login ? null : (
// //                 <Box component="li" sx={{ mb: 2 }}>
// //                   <Typography
// //                     variant="body2"
// //                     className="font-bold text-gray-650 mb-1"
// //                   >
// //                     username
// //                   </Typography>
// //                   <TextField
// //                     variant="outlined"
// //                     // name="name"
// //                     // value={user.userName}
// //                     // onChange={handleInput}
// //                     onChange={(e) => setuserName(e.target.value)}
// //                     fullWidth
// //                     className="w-[20vw] rounded-lg"
// //                   />
// //                 </Box>
// //               )}

// //               <Box component="li" sx={{ mb: 2 }}>
// //                 <Typography
// //                   variant="body2"
// //                   className="font-bold text-gray-650 mb-1"
// //                 >
// //                   Email
// //                 </Typography>
// //                 <TextField
// //                   variant="outlined"
// //                   // name="name"
// //                   // value={user.email}
// //                   // onChange={handleInput}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   type="email"
// //                   fullWidth
// //                   className="w-[20vw] rounded-lg"
// //                 />
// //               </Box>
// //               {login ? null : (
// //                 <Box component="li" sx={{ mb: 2 }}>
// //                   <Typography
// //                     variant="body2"
// //                     className="font-bold text-gray-650 mb-1"
// //                   >
// //                     Phone
// //                   </Typography>
// //                   <TextField
// //                     variant="outlined"
// //                     // name="name"
// //                     // value={user.phone}
// //                     // onChange={handleInput}
// //                     onChange={(e) => setPhone(e.target.value)}
// //                     type="number"
// //                     fullWidth
// //                     className="w-[20vw] rounded-lg"
// //                   />
// //                 </Box>
// //               )}

// //               <Box component="li" sx={{ mb: 2 }}>
// //                 <Typography
// //                   variant="body2"
// //                   className="font-bold text-gray-650 mb-1"
// //                 >
// //                   Password
// //                 </Typography>
// //                 <TextField
// //                   variant="outlined"
// //                   // name="name"
// //                   // value={user.password}
// //                   // onChange={handleInput}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   type="password"
// //                   fullWidth
// //                   className="w-[20vw] rounded-lg"
// //                 />
// //               </Box>
// //               <Box component="li" className="flex center mt-4">
// //                 <Button
// //                   type="submit"
// //                   variant="contained"
// //                   color="success"
// //                   sx={
// //                     _650
// //                       ? {
// //                           width: "18vw",
// //                           height: "5vh",
// //                           borderRadius: "10px",
// //                           my: 2,
// //                           mx: 5,
// //                         }
// //                       : {
// //                           width: "50vw",
// //                           height: "5vh",
// //                           borderRadius: "10px",
// //                           my: 2,
// //                           mx: 5,
// //                         }
// //                   }
// //                   onClick={login ? submitLogin : submitRegister}
// //                 >
// //                   {login ? "Login" : "Register"}
// //                 </Button>
// //               </Box>
// //               <Typography
// //                 flexDirection={"row"}
// //                 variant="subtitle2"
// //                 className="text-xs text-center pt-3 font-semibold"
// //               >
// //                 {login ? " Don't " : "Already "} have an account?
// //                 <Link
// //                   component="button"
// //                   color="primary"
// //                   underline="always"
// //                   fontWeight="bold"
// //                   onClick={toggleLogin}
// //                   marginLeft={"2rem"}
// //                   flexDirection={"row"}
// //                   justifyContent={"space-between"}
// //                   px={2}
// //                 >
// //                   {login ? "Sign Up" : "Login"}
// //                 </Link>
// //               </Typography>
// //             </Box>
// //           </form>
// //         </Stack>
// //       </Stack>
// //     </>
// //   );
// // };

// // export default Register;

// import {
//   Box,
//   Button,
//   Link,
//   Stack,
//   TextField,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLoginMutation, useSigninMutation } from "../../../redux/service";

// const Register = () => {
//   const [login, setLogin] = useState(false);
//   const [userName, setuserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const _650 = useMediaQuery("(min-width:650px)");

//   const [signinUser, signinUserData] = useSigninMutation();
//   const [loginUser, loginUserData] = useLoginMutation();

//   const toggleLogin = (e) => {
//     e.preventDefault();
//     setLogin((prev) => !prev);
//   };

//   const submitLogin = async (e) => {
//     e.preventDefault();
//     await loginUser({ email, password });
//   };

//   const submitRegister = async (e) => {
//     e.preventDefault();
//     await signinUser({ userName, email, phone, password });
//   };

//   useEffect(() => {
//     // ✅ Navigate after successful register
//     if (signinUserData.isSuccess) {
//       console.log(signinUserData.data);
//       navigate("/"); // or navigate("/login") if you want them to login after register
//     }

//     // ✅ Navigate after successful login
//     if (loginUserData.isSuccess) {
//       console.log(loginUserData.data);
//       navigate("/");
//     }
//   }, [signinUserData.isSuccess, loginUserData.isSuccess, navigate]);

//   return (
//     <Stack className="w-full h-screen justify-center items-center bg-gray-200">
//       <Stack className="lg:w-[35%] md:w-[45%] sm:w-[95%] h-auto bg-gray-50 flex flex-col justify-center items-center p-3 shadow-2xl rounded-lg">
//         <Box className="logo" sx={{ mb: -2 }}>
//           <img
//             src="/src/assets/app_logo.png"
//             alt="Logo"
//             className="rounded-full w-[60px]"
//           />
//         </Box>
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           color="black"
//           mt={4}
//           fontSize={_650 ? "2.5rem" : "2rem"}
//         >
//           {login ? "Sign in" : "Welcome"} to Socialix!
//         </Typography>
//         <Typography variant="body2" color="gray.300" mt={2} mb={4}>
//           {login ? null : "Register to create your first Socialix account"}
//         </Typography>

//         <form>
//           <Box component="ul" sx={{ listStyle: "none", p: 1, m: 0 }}>
//             {!login && (
//               <Box component="li" sx={{ mb: 2 }}>
//                 <Typography variant="body2" className="font-bold mb-1">
//                   Username
//                 </Typography>
//                 <TextField
//                   variant="outlined"
//                   onChange={(e) => setuserName(e.target.value)}
//                   fullWidth
//                 />
//               </Box>
//             )}

//             <Box component="li" sx={{ mb: 2 }}>
//               <Typography variant="body2" className="font-bold mb-1">
//                 Email
//               </Typography>
//               <TextField
//                 variant="outlined"
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 fullWidth
//               />
//             </Box>

//             {!login && (
//               <Box component="li" sx={{ mb: 2 }}>
//                 <Typography variant="body2" className="font-bold mb-1">
//                   Phone
//                 </Typography>
//                 <TextField
//                   variant="outlined"
//                   onChange={(e) => setPhone(e.target.value)}
//                   type="number"
//                   fullWidth
//                 />
//               </Box>
//             )}

//             <Box component="li" sx={{ mb: 2 }}>
//               <Typography variant="body2" className="font-bold mb-1">
//                 Password
//               </Typography>
//               <TextField
//                 variant="outlined"
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password"
//                 fullWidth
//               />
//             </Box>

//             <Box component="li" className="flex center mt-4">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 sx={
//                   _650
//                     ? { width: "18vw", height: "5vh", borderRadius: "10px", my: 2, mx: 5 }
//                     : { width: "50vw", height: "5vh", borderRadius: "10px", my: 2, mx: 5 }
//                 }
//                 onClick={login ? submitLogin : submitRegister}
//               >
//                 {login ? "Login" : "Register"}
//               </Button>
//             </Box>

//             <Typography variant="subtitle2" className="text-xs text-center pt-3 font-semibold">
//               {login ? " Don't " : "Already "} have an account?
//               <Link
//                 component="button"
//                 color="primary"
//                 underline="always"
//                 fontWeight="bold"
//                 onClick={toggleLogin}
//                 sx={{ ml: 2 }}
//               >
//                 {login ? "Sign Up" : "Login"}
//               </Link>
//             </Typography>
//           </Box>
//         </form>
//       </Stack>
//     </Stack>
//   );
// };

// export default Register;

import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
  Fade,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useSigninMutation } from "../../../redux/service";
import { Person, Email, Phone, Lock } from "@mui/icons-material";
import AppLogo from "../../../assets/app_logo.png";

const Register = () => {
  const [login, setLogin] = useState(false);
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const _650 = useMediaQuery("(min-width:650px)");

  const [signinUser, signinUserData] = useSigninMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const toggleLogin = (e) => {
    e.preventDefault();
    setLogin((prev) => !prev);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    await loginUser({ email, password });
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    await signinUser({ userName, email, phone, password });
  };

  useEffect(() => {
    if (signinUserData.isSuccess) navigate("/");
    if (loginUserData.isSuccess) navigate("/");
  }, [signinUserData.isSuccess, loginUserData.isSuccess, navigate]);

  return (
    <Stack
      className="w-full h-screen"
      justifyContent="center"
      alignItems="center"
      sx={{
        fontFamily: '"Poppins", sans-serif',
        background: "linear-gradient(135deg, #40916c 0%, #1b4332 100%)",
      }}
    >
      <Fade in timeout={500}>
        <Stack
          sx={{
            width: _650 ? "35%" : "90%",
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            color: "#fff",
          }}
          alignItems="center"
        >
          <Box sx={{ mb: 2 }}>
            <img src={AppLogo} alt="Logo" className="rounded-full w-[70px]" />
          </Box>

          <Typography
            variant="h4"
            fontWeight={600}
            sx={{
              color: "#fff",
              textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {login ? "Sign In" : "Create Account"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              mb: 4,
              opacity: 0.9,
              color: "#d8f3dc",
              fontSize: "0.95rem",
            }}
          >
            {login
              ? "Welcome back! Please log into your account."
              : "Sign up to start using Socialix."}
          </Typography>

          <form style={{ width: "100%" }}>
            <Stack spacing={2.5}>
              {!login && (
                <TextField
                  variant="outlined"
                  placeholder="Username"
                  onChange={(e) => setuserName(e.target.value)}
                  InputProps={{
                    sx: {
                      height: "50px",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      color: "#fff",
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.4)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#95d5b2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#40916c",
                        background: "rgba(255,255,255,0.05)",
                      },
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#95d5b2" }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              )}

              <TextField
                variant="outlined"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: {
                    height: "50px",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    color: "#fff",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#95d5b2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#40916c",
                      background: "rgba(255,255,255,0.05)",
                    },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#95d5b2" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />

              {!login && (
                <TextField
                  variant="outlined"
                  placeholder="Phone"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    sx: {
                      height: "50px",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      color: "#fff",
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.4)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#95d5b2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#40916c",
                        background: "rgba(255,255,255,0.05)",
                      },
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "#95d5b2" }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              )}

              <TextField
                variant="outlined"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: {
                    height: "50px",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    color: "#fff",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#95d5b2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#40916c",
                      background: "rgba(255,255,255,0.05)",
                    },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#95d5b2" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                onClick={login ? submitLogin : submitRegister}
                sx={{
                  mt: 2,
                  py: 1.3,
                  background: "#40916c",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  fontFamily: '"Poppins", sans-serif',
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s ease-in-out, background 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    background: "#2d6a4f",
                  },
                }}
              >
                {login ? "Login" : "Register"}
              </Button>

              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: "center",
                  mt: 2,
                  fontSize: "0.9rem",
                  color: "#d8f3dc",
                }}
              >
                {login ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link
                  component="button"
                  underline="always"
                  onClick={toggleLogin}
                  sx={{
                    fontWeight: 600,
                    color: "#95d5b2",
                    "&:hover": { color: "#d8f3dc" },
                  }}
                >
                  {login ? "Sign Up" : "Login"}
                </Link>
              </Typography>
            </Stack>
          </form>
        </Stack>
      </Fade>
    </Stack>
  );
};

export default Register;
