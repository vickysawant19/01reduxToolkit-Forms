import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers, selectUser } from "./usersSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { selectUserPosts } from "../posts/postSlice";

const UserPosts = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUser(state, id));
  const posts = useSelector((state) => selectUserPosts(state, id));

  return (
    <div className="bg-slate-400 min-h-screen">
      <h1 className="font-semibold p-2">{user?.username} Posts :</h1>
      <div>
        <ol>
          {posts.map((post, index) => (
            <li
              key={index}
              className="flex border-b w-full p-2 hover:bg-blue-600 hover:text-white "
            >
              <h1>{index + 1}.</h1>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default UserPosts;
