import React from "react";
import SearchInput from "../../search/SearchInput";
import SearchProfileBar from "../../search/SearchProfileBar";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Search = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _650 = useMediaQuery("(min-width:650px)");

  const { searchedUsers } = useSelector((state) => state.service);

  return (
    <>
      <SearchInput />
      <Stack
        flexDirection={"column"}
        gap={1}
        mb={5}
        width={_400 ? "60%" : "90%"}
        maxWidth={"750px"}
        mx={"auto"}
      >
        {searchedUsers ? (
          searchedUsers.length > 0 ? (
            searchedUsers.map((e) => {
              return <SearchProfileBar key={e._id} e={e} />;
            })
          ) : (
            ""
          )
        ) : (
          <Typography variant="h6" textAlign={"center"} mb={5}>
            Start searching...
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default Search;
