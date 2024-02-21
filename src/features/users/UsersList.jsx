import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";
import { selectAllPosts } from "../posts/postSlice";

const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const posts = useSelector(selectAllPosts);
  return (
    <div
      className="flex flex-col bg-slate-400 min-h-screen
      "
    >
      <h1 className="font-semibold m-2 "> Users List:</h1>
      {users.map((user) => {
        const userPosts = posts.filter((post) => post.userid === user.id);
        return (
          <ol
            key={user.id}
            className="border-b flex items-center gap-2  hover:bg-blue-500 hover:text-white"
          >
            <li className="ml-4 p-2 " key={user.id}>
              <Link to={`${user.id}`}> {user.username}</Link>
            </li>{" "}
            <h2 className="text-sm text-gray-600"> {userPosts.length} Posts</h2>
          </ol>
        );
      })}
    </div>
  );
};

export default UsersList;
