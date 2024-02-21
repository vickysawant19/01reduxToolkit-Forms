import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getStatus, selectAllPosts } from "./postSlice";

import PostedBy from "./PostedBy";
import Timestamp from "./Timestamp";
import AddPost from "./AddPost";
import Reactions from "./Reactions";

const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  const sortedPosts = [...posts].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp)
  );

  const content = sortedPosts.map((post, index) => {
    return (
      <div
        className=" mb-2 p-2 bg-gradient-to-tr from-slate-500 to-slate-400 rounded "
        key={post.id}
      >
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
      <div className="flex flex-col items-center md:max-w-screen-md md:flex gap-2 ">
        <div className="w-96">
          <AddPost />
        </div>
        <div className="mx-2">
          {status === "Success" ? content : <>Loading..</>}
        </div>
      </div>
    </>
  );
};

export default Posts;
