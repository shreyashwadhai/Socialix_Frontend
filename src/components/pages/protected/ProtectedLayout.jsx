import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

//  Import Components
import Header from "../../common/Header";
import AddPostModel from "../../models/AddPostModel";
import EditProfile from "../../models/EditProfile";
import MainMenu from "../../menu/MainMenu";
import MyMenu from "../../menu/MyMenu";

const ProtectedLayout = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");
  return (
    <>
      <Stack
        flexDirection={"column"}
        width={_400 ? "800px" : "90%"}
        maxWidth={_650 ? "800px" : "90%"}
        minWidth={"100%"}
        mx={"auto"}
        overflow={"hidden"}
      >
        <Header />
        <AddPostModel />
        <EditProfile />
        <MainMenu />
        <MyMenu />
        <Outlet />
      </Stack>
    </>
  );
};

export default ProtectedLayout;
