import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ id }) => {
    const result = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    return id;
  }
);

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

export const updatePosts = createAsyncThunk(
  "posts/updatePosts",
  async (post) => {
    const { id } = post;
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        post
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
        let min = -1;
        const posts = action.payload.map((post) => {
          const { body: content, userId: userid, ...post1 } = post;
          min++;
          // min = Math.floor(Math.random() * 10000) + 1;
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
        state.status = "Success";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(addToPosts.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(addToPosts.fulfilled, (state, action) => {
        state.status = "Success";
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
      })
      .addCase(updatePosts.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(updatePosts.rejected, (state) => {
        state.status = "Error";
        state.error = action.error;
      })
      .addCase(updatePosts.fulfilled, (state, action) => {
        state.status = "Success";
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.posts = state.posts.filter((post) => post.id !== Number(id));
        state.status = "Success";
      });
  },
});

export const { addPost, addReaction } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;

export const selectOnePost = (state, id) => {
  const post = state.posts.posts.find((post) => post.id === Number(id));
  return post;
};

export const selectUserPosts = (state, id) => {
  const posts = state.posts.posts.filter((post) => post.userid === Number(id));
  return posts;
};

export const getStatus = (state) => state.posts.status;
export const getError = (state) => state.posts.error;
export default postsSlice.reducer;
