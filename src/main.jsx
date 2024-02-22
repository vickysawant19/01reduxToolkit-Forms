import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./features/posts/Posts.jsx";
import AddPost from "./features/posts/AddPost.jsx";
import SinglePost from "./features/posts/SinglePost.jsx";
import EditPost from "./features/posts/EditPost.jsx";
import UsersList from "./features/users/UsersList.jsx";
import UserPosts from "./features/users/UserPosts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<App />}>
            <Route index path="/" element={<Posts />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/users" element={<UsersList />}></Route>
            <Route path="/users/:id" element={<UserPosts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
