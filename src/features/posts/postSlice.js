import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    userid: 0,
    title: "Exciting News!",
    content:
      "I'm thrilled to announce that my new book is now available for pre-order!",
    timestamp: "2024-02-19T08:30:00Z",
    reactions: {
      thumb: 0,
      heart: 0,
      wow: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: 2,
    userid: 2,
    title: "Travel Adventure",
    content:
      "Just returned from an amazing trip to Japan. The culture, food, and sights were incredible!",
    timestamp: "2024-02-18T15:45:00Z",
    reactions: {
      thumb: 0,
      heart: 0,
      wow: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: 3,
    userid: 1,
    title: "Tech Update",
    content:
      "Just launched the latest version of our app with exciting new features. Check it out!",
    timestamp: "2024-02-17T10:20:00Z",
    reactions: {
      thumb: 0,
      heart: 0,
      wow: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userid) => {
        const id = nanoid();
        const timestamp = new Date().toISOString();
        return {
          payload: {
            id,
            title,
            content,
            userid,
            timestamp,
            reactions: {
              thumb: 0,
              heart: 0,
              wow: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction: (state, action) => {
      const { reactionName, id } = action.payload;
      const post = state.find((post) => post.id === id);
      if (post) {
        post.reactions[reactionName]++;
      }
    },
  },
});
export const { addPost, addReaction } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts;
export default postsSlice.reducer;
