import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    openAddPostModel: false,
    openEditProfileModel: false,
    anchorE1: null,
    anchorE2: null,
    darkMode: false,
    myInfo: null,
    user: {},
    allPosts: [],
    postId: null,
    searchedUsers: [],

  },
  reducers: {
    addPostModel: (state, action) => {
      state.openAddPostModel = action.payload;
    },
    editProfileModel: (state, action) => {
      state.openEditProfileModel = action.payload;
    },
    toggleMainMenu: (state, action) => {
      state.anchorE1 = action.payload;
    },
    toggleMyMenu: (state, action) => {
      state.anchorE2 = action.payload;
    },
    toggleColorMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    addMyInfo: (state, action) => {
      state.myInfo = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload
    },
    addToAllPost: (state, action) => {
      const newPostArr = [...action.payload.posts];
      if (state.allPosts.length === 0) {
        state.allPosts = newPostArr;
        return;
      }
      const existingPosts = [...state.allPosts];
      newPostArr.forEach((e) => {
        const existingIndex = existingPosts.findIndex((i) => {
          return i._id === e._id;
        })
        if (existingIndex !== -1) {
          existingPosts[existingIndex] = e;
        }
        else {
          existingPosts.push(e);
        }
      });
      state.allPosts = existingPosts;
    },
    addSingle: (state, action) => {
      let newArr = [...state.allPosts];
      let updatedArr = [action.payload.newPost, ...newArr];
      let uniqueArr = new Set();
      let uniquePosts = updatedArr.filter((e) => {
        if (!uniqueArr.has(e._id)) {
          uniqueArr.add(e);
          return true
        }
        return false;
      });
      state.allPosts = [...uniquePosts];
    },
    deleteThePost: (state, action) => {
      let postArr = [...state.allPosts];
      let newArr = postArr.filter((e) => e._id !== state.postId);
      state.allPosts = newArr;
    },
    addPostId: (state, action) => {
      state.postId = action.payload;
    },

    addToSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },
  },
});

export const {
  addPostModel,
  editProfileModel,
  toggleMainMenu,
  toggleMyMenu,
  toggleColorMode,
  addMyInfo,
  addUser,
  addToAllPost,
  addSingle,
  deleteThePost,
  addPostId,
  addToSearchedUsers
} = serviceSlice.actions;

export default serviceSlice.reducer;
