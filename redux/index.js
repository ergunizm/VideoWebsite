import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

export const videoSlice = createSlice({
  name: "video",

  initialState: {
    items: [],
  },

  reducers: {
    getSingleVideo(state, action) {
      return action.payload;
    },
    getSearchedVideos(state, action) {
      state.items = action.payload;
    },
    getFavoriteVideos(state, action) {
      state.items = action.payload;
    },
    getAllVideos(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.video,
      };
    },
  },
});

const makeStore = () =>
  configureStore({
    reducer: {
      [videoSlice.name]: videoSlice.reducer,
    },
    devTools: true,
  });

export const fetchVideo = (id) => async (dispatch) => {
  const res = await fetch(`http://localhost:8080/videos/${id}`);
  const data = await res.json();

  const video = dispatch(videoSlice.actions.getSingleVideo(data));

  return video;
};

export const fetchVideos = () => async (dispatch) => {
  const res = await fetch(`http://localhost:8080/videos`);
  const data = await res.json();

  dispatch(videoSlice.actions.getAllVideos(data));
};

export const fetchSearchResults = (name) => async (dispatch) => {
  const res = await fetch(`http://localhost:8080/videos/search=${name}`);
  const data = await res.json();

  dispatch(videoSlice.actions.getSearchedVideos(data));
};

export const fetchFavorites = (id) => async (dispatch) => {
  const res = await fetch(`http://localhost:8080/users/fav=${id}`);
  const data = await res.json();

  dispatch(videoSlice.actions.getFavoriteVideos(data));
};

export const wrapper = createWrapper(makeStore, { debug: true });

export const selectAll = () => (state) => state.video.items;
