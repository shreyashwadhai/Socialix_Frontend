import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Box } from "@mui/material";

//  Import Components

import Register from "./components/pages/protected/Register";
import Error from "./components/pages/Error";
import Home from "./components/pages/protected/Home";
import Search from "./components/pages/protected/Search";
import Profile from "./components/pages/protected/Profile";
import ProtectedLayout from "./components/pages/protected/ProtectedLayout";
import ProfileLayout from "./components/pages/protected/profile/ProfileLayout";
import ProfilePosts from "./components/pages/protected/profile/ProfilePosts";
import Replies from "./components/pages/protected/profile/Replies";
import Reposts from "./components/pages/protected/profile/Reposts";
import SinglePost from "./components/pages/protected/SinglePost";
import { useSelector } from "react-redux";
import { useMyInfoQuery } from "./redux/service";

import Message from "./components/pages/protected/Message";
import VedioCall from "./components/pages/protected/calls/VedioCall";
import VoiceCall from "./components/pages/protected/calls/VoiceCall";

const App = () => {
  const { darkMode } = useSelector((state) => state.service);

  const { data, isError } = useMyInfoQuery();
  if (isError || !data) {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <>
      <Box minHeight={"100vh"} bgcolor={darkMode ? "black" : "white"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedLayout />}>
              <Route exact path="" element={<Home />} />
              <Route exact path="post/:id" element={<SinglePost />} />
              <Route exact path="search" element={<Search />} />
              <Route exact path="message" element={<Message />}>
                <Route exact path="vedio-call" element={<VedioCall />} />
                <Route exact path="voice-call" element={<VoiceCall />} />
              </Route>

              <Route exact path="profile" element={<ProfileLayout />}>
                <Route exact path="posts/:id" element={<ProfilePosts />} />
                <Route exact path="replies/:id" element={<Replies />} />
                <Route exact path="reposts/:id" element={<Reposts />} />
              </Route>
            </Route>

            <Route exact path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};

export default App;
