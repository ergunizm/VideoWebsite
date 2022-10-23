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
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();

  const video = dispatch(videoSlice.actions.getSingleVideo(data));

  return video;
};

export const fetchVideos = () => async (dispatch) => {
  const res = await fetch(`https://dummyjson.com/products`);
  const data = await res.json();

  dispatch(videoSlice.actions.getAllVideos(data));
};

export const wrapper = createWrapper(makeStore, { debug: true });

export const selectAll = () => (state) => state?.video.items;

/*
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
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const video = await res.json();

  dispatch(videoSlice.actions.getSingleVideo(video));
};

export const fetchVideos = () => async (dispatch) => {
  const res = await fetch(`https://dummyjson.com/products`);
  const data = await res.json();

  dispatch(videoSlice.actions.getAllVideos(data));
};

export const wrapper = createWrapper(makeStore, { debug: true });

export const selectVideo = (id) => (state) => state?.video;
export const selectAll = () => (state) => state?.video.items;
*/
