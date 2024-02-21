import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const addToPosts = createAsyncThunk(
  "posts/addToPosts",
  async ({ title, content, userid }) => {
    const postData = {
      title,
      content,
      userid,
    };
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postData
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

    return res.data;
  } catch (error) {
    return error;
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: ({ title, content, userid }) => {
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
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.reactions[reactionName]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "Pending";
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "Success";
        let min = -1;

        const posts = action.payload.map((post) => {
          const { body: content, userId: userid, ...post1 } = post;
          min++;
          return {
            ...post1,
            userid,
            timestamp: sub(new Date(), { minutes: min }).toISOString(),
            reactions: {
              thumb: 0,
              heart: 0,
              wow: 0,
              rocket: 0,
              coffee: 0,
            },
            content,
          };
        });

        state.posts = posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addToPosts.fulfilled, (state, action) => {
        const postData = {
          ...action.payload,
          id: state.posts.length + 1,
          timestamp: new Date().toISOString(),
          reactions: {
            thumb: 0,
            heart: 0,
            wow: 0,
            rocket: 0,
            coffee: 0,
          },
        };
        state.posts.push(postData);
      });
  },
});

export const { addPost, addReaction } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getStatus = (state) => state.posts.status;
export const getError = (state) => state.posts.error;
export default postsSlice.reducer;
