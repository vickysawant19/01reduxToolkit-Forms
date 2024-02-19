import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";

import PostedBy from "./PostedBy";
import Timestamp from "./Timestamp";
import AddPost from "./AddPost";
import Reactions from "./Reactions";

const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const sortedPosts = [...posts].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp)
  );

  const content = sortedPosts.map((post, index) => {
    return (
      <div className="border mb-2 p-2 bg-slate-500 " key={post.id}>
        <h1 className=" text-2xl capitalize">{post.title}</h1>
        <div>{post.content}</div>
        <div className="flex justify-between mt-2 ">
          <PostedBy userid={post.userid} />
          <Timestamp time={post.timestamp} />
        </div>
        <Reactions reactions={post.reactions} id={post.id} />
      </div>
    );
  });
  return (
    <>
      <div className="max-w-screen-md">
        <AddPost />
        <div className="">{content ? content : ""}</div>
      </div>
    </>
  );
};

export default Posts;
